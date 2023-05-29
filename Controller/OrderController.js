const Order=require("../Model/Order")
const OrderDetail=require("../Model/OrderDetail")
const CartDetail=require('../Model/CartDetail')
const Product = require("../Model/Product")
const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')

exports.create = async (req, res) => {
 const { idUser,mail, firstName, lastName, tel, adresse, cp, city, deliverydate, totalPrice, paid, discount} = req.body
 await Order.create({ 
  idUser:idUser,
  mail:mail, 
  firstname:firstName,
  lastname:lastName,
  telephone:tel,
  adresse:adresse,
  cp:cp,
  city:city,
  deliverydate:deliverydate,
  totalprice:totalPrice,
  paid:paid,
  discount:discount
}).then((data)=>{
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alicehe951015@gmail.com',
      pass: 'xosvtlvmkfnymgzw'
    }
  });

  const emailTemplate = fs.readFileSync('Template/confirm-order.html', 'utf8')
  const compiledTemplate = handlebars.compile(emailTemplate)
  const url=process.env.URL
  //const html = compiledTemplate({ clientHomeLink: `http://localhost:3000/home/user/${idUser}` });
  const html = compiledTemplate({ clientHomeLink: `${url}home/user/${idUser}` });

  const mailOptions = {
    from: 'alicehe951015@gmail.com',
    to: mail,
    subject: 'Traiter Lian - Commande confirmée',
    html: html
  }

  try {
    res.status(200).send(data)
    transporter.sendMail(mailOptions)
  } catch (error) {
    console.error(error);
    res.status(500).send({reset:false, message:'Erreur lors de l\'envoi de l\'e-mail.'});
  }

}).catch((e)=>{ 
  res.status(500).end()
  throw e
})
}

exports.addOrderDetail = async (req, res) => {
  const {idOrder, cart}= req.body
  try {
    for (const element of cart) {
      element["idOrder"] = idOrder;
      await OrderDetail.create(element);
    }
    res.send({ succes: true, message: "Commande réussi" });
  } catch (e) {
    res.status(500).send({ succes: false, message: "Erreur insert order_detail" });
    throw e;
  }
}

exports.getAllByUser = async (req, res) => {
  const {idUser} = req.params
  await Order.findAll({
    where:{idUser:idUser}, 
    include: [
      { model: OrderDetail, as: 'orderdetails', 
      include:[{ model: Product, as: 'product' }] },
    ],
    order: [['createdAt', 'DESC']] 
  }).then((data)=>{
    if (data){
     res.send(data)
    }else{
      res.send({message:"Aucun order trouvé"})
    }
   })
}

exports.getUser = async (req, res) => {
  const {idOrder} = req.params
  await Order.findByPk(idOrder).then((data)=>{
    if (data){
     res.send(data)
    }else{
      res.send({message:"Client non trouvé"})
    }
   })
}

exports.getAllByFilter = async (req, res) => {
  const {param, value} = req.params
  const whereClause = {}
  whereClause[param] = value
  await Order.findAll({
    where:whereClause, 
    include: [
      { model: OrderDetail, as: 'orderdetails', 
      include:[{ model: Product, as: 'product' }] },
    ],
    order: [['createdAt', 'DESC']] 
  }).then((data)=>{
    if (data){
     res.send(data)
    }else{
      res.send({message:"Aucun order trouvé"})
    }
   })
}

exports.getAll = async (req, res) => {
  await Order.findAll({
    include: [
      { model: OrderDetail, as: 'orderdetails', 
      include:[{ model: Product, as: 'product' }] },
    ],
    order: [['createdAt', 'DESC']] 
  }).then((data)=>{
    if (data){
     res.send(data)
    }else{
      res.send({message:"Aucun order trouvé"})
    }
   })
}

exports.changeStatus = async (req, res) => {
  console.log(process.env)
  const {idOrder, orderStatus} = req.body
  await Order.update(
    {orderstatus:orderStatus},
    {where:{idOrder:idOrder}}).then((data)=>{
    if (data){
      res.send({modify:true, message:'Status modifié avec réussite ! '});
    }else{
      res.send({modify:false, message:'Erreur modifier Status'});
    }
   })
 }

