const UserModel = require('../models/user')

exports.get_user = async (req, res) => {
    UserModel.get_user_data(req.params.username)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err); //TODO: Return proper status code
        });
}



