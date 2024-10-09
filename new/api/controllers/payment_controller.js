const PaymentModel = require('../models/payment');

exports.pay_teacher = async (req, res) => {
    PaymentModel.pay_teacher(global.idsu, global.idpro, req.body.payment_card, req.body.email)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err); //TODO: Return proper status code
        });
}