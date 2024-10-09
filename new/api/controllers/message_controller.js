const MessageModel = require('../models/message');

exports.insert_message = async (req, res) => {
    MessageModel.insert_message(global.idsu, global.idpro, req.body.message, req.body.type)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err); //TODO: Return proper status code
        });
}

exports.insert_private_message = async (req, res) => {
    MessageModel.insert_message(req.body.idusu, global.idproLogueado, req.body.message, req.body.type)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err); //TODO: Return proper status code
        });
}

exports.get_teacher_message = async (req, res) => {
    MessageModel.get_teacher_message(global.idsu, global.idpro)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err); //TODO: Return proper status code
        });
}

exports.get_private_message = async (req, res) => {
    MessageModel.get_private_message(global.idproLogueado)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err); //TODO: Return proper status code
        });
}