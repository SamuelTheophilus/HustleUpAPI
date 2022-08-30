import fetch from 'node-fetch';

const Payments = require('../models/paymentModel');


const userPayment = (req, res) => {
  let { description } = req.body;
  const resp = await fetch(
    `https://devp-reqsendmoney-230622-api.hubtel.com/request-money/bulk`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from('wzlhlejg:ltdqzqlo').toString('base64')
      },
      body: JSON.stringify({
        amount: 1,
        title: 'string',
        description: description , 
        clientReference: 'string',
        callbackUrl: 'http://example.com',
        cancellationUrl: 'http://example.com',
        returnUrl: 'http://example.com',
        logo: 'http://example.com',
        audience: ['string']
      })
    }
  );

  const data = await resp.json();
  console.log(data);

}


run();

module.exports ={
  userPayment,
}

