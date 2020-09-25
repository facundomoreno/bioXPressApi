var mercadopago = require('mercadopago');

mercadopago.configurations.setAccessToken("TEST-7516335497846145-022113-117a386babbbb51e9924cc29a347bf23LD_LB-80934812");

module.exports = {

  handlePayment: (req) => {

    var payment_data = {
      transaction_amount: Number(req.body.transactionAmount),
      token: req.body.token,
      description: req.body.description,
      installments: Number(req.body.installments),
      payment_method_id: req.body.paymentMethodId,
      issuer_id: req.body.issuer,
      payer: {
        email: req.body.email,
        identification: {
          type: req.body.docType,
          number: req.body.docNumber
        }
      }
    };

    mercadopago.payment.save(payment_data)
    .then(function(response) {
      return res.status(response.status).json({
        status: response.body.status,
        status_detail: response.body.status_detail,
        id: response.body.id
      });
    })
    .catch(function(error) {
      return res.status(response.status).send(error);
    });

  }

};
