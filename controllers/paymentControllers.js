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
              Authorization: 'Basic ' + Buffer.from('wzlhlejg:ltdqzqlo').toString('base64')
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




module.exports = {
  userPayment,
}

