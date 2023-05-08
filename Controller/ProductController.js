const Product=require("../Model/Product")
const Picture=require("../Model/Picture")
exports.getAll = async (req, res) => {
 await Product.findAll({ include:[{model:Picture,as:'pictures'}]}).then((data)=>{
  if (data){
   res.send(data)
  }else{
    res.send({message:"Aucun produit trouvé"})
  }
 })
}

exports.getProductById = async (req, res) => {
  const { idProduct} = req.params
  await Product.findOne({
    where:{idProduct},
    include:[{model:Picture,as:'pictures'}]}).then((data)=>{
   if (data){
    res.send(data)
   }else{
     res.send({message:"Aucun produit trouvé"})
   }
  })
 }
 
exports.getPictures = async (req, res) => {
 const { idProduct} = req.params
 const product = await Product.findByPk(idProduct);
 await product.getPictures().then((data)=>{
  if (data){
   res.send(data)
  }else{
    res.send({auth:false, message:"Aucune image trouvée"})
  }
 })
}

exports.updateProduct = async (req, res) => {
  const { category, idProduct, nameProduct, price } = req.body
  await Product.update(
    { category, nameProduct, price },
    { where: { idProduct } }).then((data) => {
      res.status(200).send({update:true})
    }).catch((e)=>{ 
      res.status(500).end()
      throw e
    })
}

exports.getAllByFilter = async (req, res) => {
  const {param, value} = req.params
  const whereClause = {}
  whereClause[param] = value
  await Product.findAll({
    where:whereClause, 
    include:[{model:Picture,as:'pictures'}]
  }).then((data)=>{
    if (data){
     res.send(data)
    }else{
      res.send({message:"Aucun produit trouvé"})
    }
   })
}
