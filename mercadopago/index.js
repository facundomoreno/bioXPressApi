const mercadopago = require('mercadopago');

module.exports = {
    configurar: (req, res, next) => {
        mercadopago.configure({
            sandbox: true,
            access_token: process.env.TOKEN_MERCADOPAGO
        })
    },
    nuevoPago: (req, res, next) => {
        mercadopago.payment.create({
            description: req.body.description,
            transaction_amount: req.body.amount,
            payment_method_id: req.body.payment_method,
            payer: {
              email: req.body.email,
          
              identification: {
                type: req.body.type,
                number: req.body.dni
              }
          
            }
          }).then(function (mpResponse) {
            console.log(mpResponse);
          }).catch(function (mpError) {
            console.log(err);
        })
     
    }
}