const User = require("../Model/User");
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");
const { param } = require("../Router/UserRouter");

exports.createUser = async (req, res) => {
  console.log(req.body)
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
    //console.log(e)
    res.status(500).end()
    throw e
  })
};

exports.connexion= async (req, res) => {
  const { mail, mdp } = req.body
  console.log(req.body)
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
            expiresIn:100,
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
exports.isLogged=async(req,res)=>{
  res.send("is logged")
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
      res.send({exist:true, message:"Unvalid Mail"})
    }else{
      res.send({exist:false, message:"Valid Mail"})
    }
  })
}

exports.updateUser = async (req, res) => {
 const { id } = req.params;
 const { mail, password } = req.body;
 try {
   const user = await User.findByPk(id);
   if (!user) {
     res.status(404).json({ message: "User not found" });
   } else {
     user.mail = mail;
     user.password = password;
     await user.save();
     res.json(user);
   }
 } catch (err) {
   res.status(500).json({ message: err.message });
 }
};
