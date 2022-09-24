const { request } = require('http');
const https = require('https')
const Payments = require('../models/paymentModel');
const ordersModel = require('../models/ordersModel')


async function paystackapi(orderId) {
  //pass order Id as an argument to to store reference 

  const params = JSON.stringify({
    "email": "customer@email.com",
    "amount": "2",
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
      await ordersModel.findOneAndUpdate({_id: orderId}, {$set: {paystackRef: reference}, $set: {paystackUrl: paylink}})
    })
  }).on('error', error => {
    console.error(error)
  })

  const result = await req();
  result.write(params)
  result.end()

  console.log(`out reference ${reference}`)

}


async function verify() {

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/verify/5lkgn7qihp',
    method: 'GET',
    headers: {
      Authorization: 'Bearer sk_live_239bb79499e1d22e5ffd5c4aa872240df559d508',
    }
  }

  https.request(options, res => {
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
}



const userPayment = async (req, res) => {
  let { description, amount, userId, employeeId, orderId } = req.body;

  amount = parseFloat(amount)
  await Payments.create({ description, amount, userId, employeeId })
  await paystackapi(orderId);
  
  // await verify();

  res.send('done')


}












const employeePaymentController = async (req, res) => {
  let { amount, number } = req.body;
  amount = parseFloat(amount);


}

const successNotice = async (req, res) => {
  let reference = req.query.reference;

  let success = await ordersModel.findOneAndUpdate({paystackRef: reference}, {$set: {paid: true}})
  if (success ){
    res.send('Hubtel API was a seccess')
  }
  // console.log('successful url')
}

const failureNotice = async (req, res) => {
  res.send('Hubtel API was cancelled')
}





module.exports = {
  userPayment,
  employeePaymentController,
  successNotice,
  failureNotice
}

