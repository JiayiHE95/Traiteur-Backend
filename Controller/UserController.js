const User = require("../Model/User");
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")

exports.createUser = async (req, res) => {
  const { mail, mdp } = req.body
  const hashedPassword = await bcrypt.hash(mdp, 10);
  await User.create({ mail:mail, mdp:hashedPassword }).then((data)=>{
    res.status(200).send(data)
  }).catch((e)=>{ 
    console.log(e)
    res.status(500).end()
    throw e
  })
};

exports.connexion= async (req, res) => {
  const { mail, mdp } = req.body
  console.log("coucou")
  console.log(req.body)
  await User.findAll({ 
    raw: true,
    where: { mail: mail } 
  }).then((data)=>{
    if (data.length==1){
      bcrypt.compare(mdp, data[0].mdp, (e, response)=>{
        if (response){
          const mail=data[0].mail
          const token=jwt.sign({mail},"jwtSecret",{
            //TODO
            expiresIn:10,
          })
          res.send({auth:true, token:token, result:data})
        }else{
          res.send({auth:false, message:"Identifiant ou mot de pass incorrect"})
        }
      })
    }else{
      res.send({auth:false, message:"Utilisateur n'existe pas"})
    }
  })
}

/*
exports.deconnexion()= async (req, res) => {
}*/

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
      console.log("xc")
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