const TeacherModel = require('../models/teacher');

exports.get_teacher = async (req, res) => {
    TeacherModel.get_teacher_data(req.params.teacher_id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err); //TODO: Return proper status code
        });
}

exports.list_courses = async (req, res) => {
    TeacherModel.list_courses(req.body.course)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err); //TODO: Return proper status code
        });
}

exports.rate_teacher = async (req, res) => {
    TeacherModel.rate_teacher(global.idpro, req.body.rate)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err); //TODO: Return proper status code
        });
}

exports.update_teacher = async (req, res) => {
    TeacherModel.update_teacher(global.idsu, req.body.name, req.body.surname, req.body.email)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err); //TODO: Return proper status code
        });
}

exports.update_course = async (req, res) => {
    TeacherModel.update_course(global.idproLogueado, req.body.course, req.body.description)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err); //TODO: Return proper status code
        });
}