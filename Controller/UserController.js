const User = require("../Model/User")
const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken")
const nodemailer = require('nodemailer')

exports.createUser = async (req, res) => {
  //console.log(req.body)
  const { mail, mdp, firstName, lastName, tel, adresse, cp, city} = req.body
  const hashedPassword = await bcrypt.hash(mdp, 10);
  await User.create({ 
    mail:mail, 
    mdp:hashedPassword, 
    firstname:firstName,
    lastname:lastName,
    telephone:tel,
    adresse:adresse,
    cp:cp,
    city:city
  }).then((data)=>{
    res.status(200).send(data)
  }).catch((e)=>{ 
    res.status(500).end()
    throw e
  })
};

exports.connexion= async (req, res) => {
  const { mail, mdp } = req.body
  await User.findOne({ 
    raw: true,
    where: { mail: mail } 
  }).then((data)=>{
    if (data){
      bcrypt.compare(mdp, data.mdp, (e, response)=>{
        if (response){
          const mail=data.mail
          const token=jwt.sign({mail},"jwtSecret",{
            //TODO
            expiresIn:500,
          })
          res.send({auth:true, token:token, user:data})
        }else{
          res.send({auth:false, message:"Identifiant ou mot de pass incorrect"})
        }
      })
    }else{
      res.send({auth:false, message:"Utilisateur n'existe pas"})
    }
  })
}


exports.verifyJWT=(req,res,next)=>{
  const token=req.headers["x-access-token"]
  if (!token){
    res.send({auth:false, message:"token non trouvable"})
  }else{
    jwt.verify(token,"jwtSecret",(err,decoded)=>{
      if(err){
        res.send({auth:false, message:"token expiré"})
      }else{
        req.userId=decoded.id
        res.send({auth:true, message:"logged"})
        next()
      }
    })
  }
}

exports.verifyPWToken=(req,res,next)=>{
  const token=req.headers["pw-token"]
  if (!token){
    res.send({auth:false, message:"pw token non trouvable"})
  }else{
    jwt.verify(token,"passwordForgot",(err)=>{
      if(err){
        res.send({auth:false, message:"pw token expiré"})
      }else{
        res.send({auth:true, message:"pw token vérifié"})
        next()
      }
    })
  }
}

exports.passwordForgot=async(req,res)=>{
  const { mail} = req.body
  await User.findOne({ 
    raw: true,
    where: { mail: mail } 
  }).then((data)=>{
    if (data){
      const token=jwt.sign({mail},"passwordForgot",{
        expiresIn:1000,
      })
      User.update({ reset_password_token: token }, { where: { mail: mail } })
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'alicehe951015@gmail.com',
          pass: 'xosvtlvmkfnymgzw'
        }
      });
      const mailOptions = {
        from: 'alicehe951015@gmail.com',
        to: mail,
        subject: 'Réinitialisation de mot de passe',
        text: `Bonjour,\n\nNous avons reçu une demande de réinitialisation de votre mot de passe.\nCliquez sur le lien suivant pour réinitialiser votre mot de passe :\nhttp://localhost:3000/reset-password/${token}`
      }

      try {
        // Envoyer l'e-mail
        transporter.sendMail(mailOptions)
        res.status(200).send('Un e-mail a été envoyé pour réinitialiser votre mot de passe.');
      } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'envoi de l\'e-mail.');
      }
    }})
}

exports.passwordReset = async (req, res) => {
  const { mail, mdp} = req.body
  const hashedPassword = await bcrypt.hash(mdp, 10);
  await User.update({ reset_password_token: null, mdp:hashedPassword }, { where: { mail: mail } }).then((data)=>{
    res.status(200).send('Mot de passe initialisé avec réussite ! ');
  }).catch((e)=>{ 
    res.status(500).end()
    throw e
  })
 }

exports.getUsers = async (req, res) => {
 try {
   const users = await User.findAll();
   res.json(users);
 } catch (err) {
   res.status(500).json({ message: err.message });
 }
};

exports.getUserById = async (req, res) => {
 const { id } = req.params;
 try {
   const user = await User.findByPk(id);
   if (!user) {
     res.status(404).json({ message: "User not found" });
   } else {
     res.json(user);
   }
 } catch (err) {
   res.status(500).json({ message: err.message });
 }
};

exports.getUserByMail= async (req, res) => {
  const { mail} = req.params
  await User.findAll({ 
    //raw: true,
    where: { mail: mail } 
  }).then((data)=>{
    if (data.length>0){
      res.send({exist:true, message:"valid Mail"})
    }else{
      res.send({exist:false, message:"UnValid Mail"})
    }
  })
}

exports.getUserByPWToken= async (req, res) => {
  const { token} = req.params
  await User.findAll({ 
    where: { reset_password_token: token } 
  }).then((data)=>{
    if (data.length>0){
      res.send(data)
    }else{
      res.send({exist:false, message:"Unvalid token"})
    }
  })
}
