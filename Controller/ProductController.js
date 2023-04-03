const Product=require("../Model/Product")
exports.getAll = async (req, res) => {
 await Product.findAll().then((data)=>{
  if (data){
   res.send(data)
  }else{
    res.send({auth:false, message:"Utilisateur n'existe pas"})
  }
 })
}

exports.getPictures = async (req, res) => {
 const { idProduct} = req.params
 const product = await Product.findByPk(idProduct);
 await product.getPictures().then((data)=>{
  if (data){
   console.log(data)
   res.send(data)
  }else{
    res.send({auth:false, message:"Utilisateur n'existe pas"})
  }
 })
}