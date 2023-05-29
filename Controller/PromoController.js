
const Promo=require("../Model/Promo")
const { Op } = require('sequelize');

exports.verifyPromo = async (req, res) => {
 const {codePromo} = req.params
  await Promo.findOne({where:{codePromo: codePromo.toUpperCase()}}).then((data)=>{
  if (data){
   res.send(data)
  }else{
    res.send({message:"Code Promo n'existe pas"})
  }
 })
}

exports.getAll = async (req, res) => {
  await Promo.findAll().then((data)=>{
    if (data){
    res.send(data)
    }else{
      res.send({message:"Aucun code promo trouvé"})
    }
  })
}

exports.update = async (req, res) => {
  const { codePromo, percent } = req.body
  await Promo.update(
    { codePromo:codePromo, percent:percent },
    { where: { codePromo:codePromo } }).then((data) => {
      res.status(200).send({update:true})
    }).catch((e)=>{ 
      res.status(500).end()
      throw e
    })
}

exports.create = async (req, res) => {
  const { codePromo, percent } = req.body
  await Promo.create({codePromo, percent}).then((data)=>{
    if (data){
      res.send(data)
    }else{
      res.send({message:"Creation echouée"})
    }
  })
}

exports.delete = async (req, res) => {
  const { codePromo } = req.params
  await Promo.destroy({where:{codePromo}}).then((data)=>{
    if (data){
      res.send({delete:true,message:"Code promo supprimé"})
    }else{
      res.send({delete:false,message:"Suppression echouée"})
    }
  })
}