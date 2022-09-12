const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));


const Payments = require('../models/paymentModel');


const userPayment = async (req, res) => {
  let { description, amount, userId, employeeId } = req.body;

  amount = parseFloat(amount)



  let paymentRecord = await Payments.create({ description, amount, userId, employeeId })
  let data = {}
  let paylinkUrl = ''
  if (paymentRecord) {
    try {
      async function run() {
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
              callbackUrl: 'https://www.youtube.com/',
              cancellationUrl: 'https://www.youtube.com/',
            })
          }
        );

        data = await resp.json();
        paylinkUrl = data.data.paylinkUrl;
        return paylinkUrl
      }

      let finalLink = await run();
      res.status(200).send(finalLink)
    } catch (err) {
      console.log(err)
      res.status(500).send('Something went wrong')
    }
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
            Authorization: 'Basic ' + Buffer.from('xqafsvei:akaabxkx' ).toString('base64')
          },
          body: JSON.stringify({
            amount: amount,
            title: 'HustleUp Payment',
            description: 'Employee Receiving Payment',
            clientReference: 'string',
            callbackUrl: 'https://www.youtube.com/',
            cancellationUrl: 'https://www.youtube.com/',
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










module.exports = {
  userPayment,
  employeePaymentController
}

