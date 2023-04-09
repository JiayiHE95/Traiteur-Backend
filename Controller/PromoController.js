
const Promo=require("../Model/Promo")
const { Op } = require('sequelize');

exports.verifyPromo = async (req, res) => {
 const {codePromo} = req.params
 console.log(codePromo)
 await Promo.findOne({where:{codePromo:{[Op.like]: codePromo}}}).then((data)=>{
  if (data){
   res.send(data)
  }else{
    res.send({message:"Code Promo n'existe pas"})
  }
 })
}