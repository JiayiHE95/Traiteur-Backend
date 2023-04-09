const Product=require("../Model/Product")
const Picture=require("../Model/Picture")
exports.getAll = async (req, res) => {
 await Product.findAll().then((data)=>{
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
   //console.log(data)
   res.send(data)
  }else{
    res.send({auth:false, message:"Aucune image trouvée"})
  }
 })
}