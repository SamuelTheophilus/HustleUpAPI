const Order = require('../models/ordersModel');
const GeneralUser = require('../models/generalUserModel');

/*
  Negotiation Contollers For The User AND Employee.
*/


const employeeAccepted = async (req, res) => {
  const id = req.query.id;
  const { orderId } = req.body
  let user = await GeneralUser.findById(id)

  let results = await Order.findOneAndUpdate({ _id: orderId, employeeName: user.name }, { status: 'A' }, { new: true })
  try {
    if (results) {
      return res.status(200).json({ message: 'Order Accepted', results })
    }
  } catch (error) {
    res.status(500).json({ message: "Order Not Accepted" })

  }

}

const employeeDeclined = async (req, res) => {
  const id = req.query.id;
  const { orderId } = req.body
  let user = await GeneralUser.findById(id)


  let results = await Order.findOneAndUpdate({ _id: orderId, employeeName: user.name }, { status: 'D' }, { new: true })
  try {
    if (results) {
      return res.status(200).json({ message: 'Order Declined', results })
    }
  } catch (error) {
    res.status(500).json({ message: "Order Not Declined" })

  }
}

const employeeCompleted = async (req, res) => {
  const id = req.query.id;
  const { orderId } = req.body
  let user = await GeneralUser.findById(id)

  let results = await Order.findOneAndUpdate({ _id: orderId, employeeName: user.name }, { status: 'C' }, { new: true })
  try {
    if (results) {
      return res.status(200).json({ message: 'Order Completed', results })
    }
  } catch (error) {
    res.status(500).json({ message: "Order Not Completed" })

  }
}

const userAgreement = async (req, res) => {
  const id = req.query.id;
  const { orderId } = req.body
  let user = await GeneralUser.findById(id)

  let results = await Order.findOneAndUpdate({ _id: orderId, senderName: user.name }, { userStatus: true }, { new: true })
  try {
    if (results) {
      return res.status(200).json({ message: 'Order Completed', results })
    }
  } catch (error) {
    res.status(500).json({ message: "Order Not Completed" })

  }
}

const falseSetting = async (req, res)=>{
  let id = req.query.id;
  let user = await GeneralUser.findById(id)

  let results = await Order.updateMany({ employeeName: user.name }, {employeePhoneNumber: 505050232})
  if(results){
    return res.status(200).json({ message: 'updated successfully'})
  } else{
    return res.status(500).json({ message: 'failed'})
  }


}

module.exports = {
  employeeAccepted,
  employeeDeclined,
  employeeCompleted,
  userAgreement,
  // falseSetting,
}