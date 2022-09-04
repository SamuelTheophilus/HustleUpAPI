const Order = require('../models/ordersModel');
const GeneralUser = require('../models/generalUserModel');

/*
  Negotiation Contollers For The User AND Employee.
*/


const employeeAccepted = async (req, res) => {
  const id = req.query.id;
  const { orderId } = req.body
  let user = await GeneralUser.findById(id)

  let results = await Order.findOneAndUpdate({ _id: orderId, employeeName: user.name }, { status: 'A' })
  try{
    if(results){
      return res.status(200).json({message: 'Order Accepted', results})
    }
  }catch(error){
    res.status(500).json({message: "Order Not Accepted"})

  }

}

const employeeDeclined = async (req, res) => {
  const id = req.query.id;
  const { orderId } = req.body
  let user = await GeneralUser.findById(id)


  let results = await Order.findOneAndUpdate({ _id: orderId, employeeName: user.name }, { status: 'D' })
  try{
    if(results){
      return res.status(200).json({message: 'Order Declined', results})
    }
  }catch(error){
    res.status(500).json({message: "Order Not Declined"})

  }
}

const employeeCompleted = async (req, res) => {
  const id = req.query.id;
  const { orderId } = req.body
  let user = await GeneralUser.findById(id)

  let results = await Order.findOneAndUpdate({ _id: orderId, employeeName: user.name }, { status: 'C' })
  try{
    if(results){
      return res.status(200).json({message: 'Order Completed' ,results})
    }
  }catch(error){
    res.status(500).json({message: "Order Not Completed"})

  }
}

const userAgreement = async (req, res) => {
  const id = req.query.id;
  const { orderId } = req.body
  let user = await GeneralUser.findById(id)

  let results = await Order.findOneAndUpdate({ _id: orderId, senderName: user.name }, { userStatus: 'C' })
  try{
    if(results){
      return res.status(200).json({message: 'Order Completed', results})
    }
  }catch(error){
    res.status(500).json({message: "Order Not Completed"})

  }
}

module.exports = {
  employeeAccepted,
  employeeDeclined,
  employeeCompleted,
  userAgreement,
}