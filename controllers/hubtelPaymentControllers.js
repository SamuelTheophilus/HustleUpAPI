const Payments = require('../models/paymentModel');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


async function userPayment(amount, description, userId, orderId, number) {

  let new_amount = parseFloat(amount)
  async function run() {
    const mobileNumber = number;
    const resp = await fetch(
      `https://consumer-smrmapi.hubtel.com/request-money/${mobileNumber}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from('xqafsvei:akaabxkx').toString('base64')
        },
        body: JSON.stringify({
          amount: new_amount,
          title: 'HustleUp Payment',
          description: description,
          clientReference: userId,
          callbackUrl: `https://hustleup-api.herokuapp.com/payments/success/reference?reference=${orderId}`,
          cancellationUrl: 'https://hustleup-api.herokuapp.com/payments/failure',
        })
      }
    );

    const data = await resp.json();
    console.log(data);
  }

  run();

}

async function employeePayment(amount, orderId, number) {

  let new_amount = parseFloat(amount)

  async function run() {
    const mobileNumber = number;
    const resp = await fetch(
      `https://consumer-smrmapi.hubtel.com/send-money/${mobileNumber}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from('xqafsvei:akaabxkx').toString('base64')
        },
        body: JSON.stringify({
          amount: new_amount,
          title: 'HustleUp Payment',
          description: 'Payment On Completion of Service',
          clientReference: orderId,
          callbackUrl: 'https://hustleup-api.herokuapp.com/payments/employee/success',
          cancellationUrl: 'https://hustleup-api.herokuapp.com/payments/employee/failure',
        })
      }
    );

    const data = await resp.json();
    console.log(data);
  }

  run();
}




//Controllers 

const receivingMoney = async (req, res) => {

  let { description, amount, userId, employeeId, orderId, number } = req.body;
  await userPayment(amount, description, userId, orderId, number);
  let payment = await Payments.create({ description, amount, userId, employeeId });

  if (payment) {
    return res.send('Success');
  } else {
    return res.send('Failure');
  }

}

const sendingMoney = async (req, res) => {

  let { number, orderId, amount } = req.body;
  let order = await ordersModel.findById(orderId);
  if (order.paid) {
    await employeePayment(amount, orderId, number)
    return res.status(200).json({message: 'Payment Successful'})
  } else{
    return res.status(500).json({message: 'Payment Incomplete'})
  }

}


module.exports = {
  receivingMoney,
  sendingMoney
}

// client id: xqafsvei
// client secret: akaabxkx