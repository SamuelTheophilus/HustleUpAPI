const { request } = require('http');
const https = require('https')
const Payments = require('../models/paymentModel');
const ordersModel = require('../models/ordersModel')
const User = require('../models/generalUserModel');

// Paystack Functions
async function paystackapi(orderId, userEmail, amount) {
  //pass order Id as an argument to to store reference 

  const params = JSON.stringify({
    "email": userEmail,
    "amount": amount,
    "currency": "GHS",
    // "callback_url"
  })

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: 'Bearer sk_test_b2a9f860ee6484634ea61df305f795b8b467e688',
      'Content-Type': 'application/json'
    }
  }

  let reference = ''
  const req = async () => https.request(options, res => {
    let data = ''

    res.on('data', (chunk) => {
      data += chunk
    });

    res.on('end', async () => {
      console.log(JSON.parse(data))
      reference = (JSON.parse(data)).data.reference;
      paylink = (JSON.parse(data)).data.authorization_url;
      console.log(`in reference: ${reference}`);
      let order = await ordersModel.findByIdAndUpdate(orderId, { $set: { paystackRef: reference, paystackUrl: paylink } }, { new: true })
      console.log(order)
    })
  }).on('error', error => {
    console.error(error)
  })

  const result = await req();
  result.write(params)
  result.end()

  console.log(`out reference ${reference}`)

}

async function transferapi(){
  const params = JSON.stringify({
    "source": "balance", 
    "reason": "HustleUp Payment", 
    "amount":3794800, 
    "recipient": "RCP_gx2wn530m0i3w3m"
  })
  
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transfer',
    method: 'POST',
    headers: {
      Authorization: 'Bearer sk_test_b2a9f860ee6484634ea61df305f795b8b467e688',
      'Content-Type': 'application/json'
    }
  }
  
  const req = https.request(options, res => {
    let data = ''
  
    res.on('data', (chunk) => {
      data += chunk
    });
  
    res.on('end', () => {
      console.log(JSON.parse(data))
    })
  }).on('error', error => {
    console.error(error)
  })
  
  req.write(params)
  req.end()
}





// Payment Controllers
const userPayment = async (req, res) => {
  let { description, amount, userId, employeeId, orderId } = req.body;

  amount = parseFloat(amount)
  await Payments.create({ description, amount, userId, employeeId })
  let user = await User.findById(userId);
  await paystackapi(orderId, user.email, amount.toString());

  res.json({message: 'Payment Initialized'})
}

const getPaylink = async (req, res) => {
  let { orderId } = req.body;

  let order = await ordersModel.findById(orderId);
  if(order){
    return res.send(order.paystackUrl)
  }
}


const employeePaymentController = async (req, res) => {
  // let { amount, number } = req.body;
  // amount = parseFloat(amount);
  await transferapi()

  res.send('done')
}

const successNotice = async (req, res) => {
  let reference = req.query.reference;
  console.log('successful url')
  let success = await ordersModel.findOneAndUpdate({ paystackRef: reference }, { $set: { paid: true } })
  if (success) {
    return res.send('Thank You for Using HustleUp')
  }
}

const success = async(req, res) =>{
  console.log(req.query)
  console.log('Done')
  res.send('Done')
}

const failureNotice = async (req, res) => {
  res.send('Hubtel API was cancelled')
}





module.exports = {
  userPayment,
  employeePaymentController,
  successNotice,
  failureNotice,
  getPaylink,
  success
}

