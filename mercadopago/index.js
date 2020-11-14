var mercadopago = require('mercadopago');

mercadopago.configurations.setAccessToken("TEST-7516335497846145-022113-117a386babbbb51e9924cc29a347bf23LD_LB-80934812");

module.exports = {

  handlePayment: (payment, response) => {

    var payment_data = {
      transaction_amount: Number(payment.transactionAmount),
      token: payment.token,
      description: payment.description,
      installments: Number(payment.installments),
      payment_method_id: payment.paymentMethodId,
      issuer_id: payment.issuer,
      payer: {
        email: payment.email,
        identification: {
          type: payment.docType,
          number: payment.docNumber
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
