const CartDetail=require("../Model/CartDetail")
const Product=require("../Model/Product")

exports.getCart = async (req, res) => {
 const {idUser} = req.params
 await CartDetail.findAll({where:{idUser:idUser}, include: [{model:Product,as:'product'}]}).then((data)=>{
  if (data){
   res.send(data)
  }else{
    res.send({message:"Aucun produit dans le panier"})
  }
 })
}

exports.add = async (req, res) => {
 const { idUser, idProduct } = req.body
}

exports.merge = async (req, res) => {
 const { idUser, products } = req.body

}
exports.update = async (req, res) => {
 const {  idUser, cart } = req.body
 await CartDetail.destroy({where:{idUser:idUser}}).catch(e => {
  console.log(e.message)
 })
 cart != undefined && cart.forEach(element => {
  element["idUser"]=idUser
  CartDetail.create(element).then((data)=>{
   if (!data){
     res.send({message:"Erreur insert cart_detail"})
   }
  })
 });
}

exports.delete = async (req, res) => {
  const {idUser} = req.params
  try {
  await CartDetail.destroy({where:{idUser:idUser}})
  res.send({ succes: true, message: "Empty Cart" });
  }catch(e) {
  console.log(e.message)
  }
}
