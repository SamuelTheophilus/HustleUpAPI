const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));


const Payments = require('../models/paymentModel');


async function run(amount, description) {
  let data = {}
  const resp = await fetch(
    `https://consumer-smrmapi.hubtel.com/request-money/bulk`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from('xqafsvei:akaabxkx').toString('base64')
      },
      body: JSON.stringify({
        amount: amount,
        title: 'HustleUp Payment',
        description: description,
        clientReference: 'string',
        callbackUrl: 'https://51b9-102-176-112-194.eu.ngrok.io/payments/success',
        cancellationUrl: 'https://51b9-102-176-112-194.eu.ngrok.io/payments/failure',
      })
    }
  );

  data = await resp.json();
  let paylinkUrl = data.data.paylinkUrl;
  return paylinkUrl
}



const userPayment = async (req, res) => {
  let { description, amount, userId, employeeId } = req.body;

  amount = parseFloat(amount)
  await Payments.create({ description, amount, userId, employeeId })

  try {
    let finalLink = await run(amount, description);
    res.status(200).send(finalLink)
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
}


const employeePaymentController = async (req, res) => {
  let { amount, number } = req.body;
  amount = parseFloat(amount);

  try {
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
            amount: amount,
            title: 'HustleUp Payment',
            description: 'Employee Receiving Payment',
            clientReference: 'string',
            callbackUrl: 'http://localhost:8000/payments/success',
            cancellationUrl: 'http://localhost:8000/payments/failure',
          })
        }
      );

      const data = await resp.json();
      console.log(data);
    }

    await run();
    res.status(200).send('Success')

  } catch (error) {
    console.log(error);
    res.status(500).send('Failure')

  }
}

const successNotice = async (req, res) => {
  res.send('Hubtel API was a seccess')
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

