const CommentModel = require('../models/comment_model');

exports.insert_comment = async (req, res) => {
    CommentModel.insert_comment(global.idsu, global.idpro, req.body.comment)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err); //TODO: Return proper status code
        });
}

exports.get_teacher_comments_list = async (req, res) => {
    CommentModel.get_teacher_comments_list(global.idpro)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err); //TODO: Return proper status code
        });
}