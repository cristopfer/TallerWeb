const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const engines = require('consolidate');

const applyMiddlewares = (app) => {
    app.use(express.static(__dirname + '/../views'));
    app.use(session({ secret: 'XASDASDA', resave: true, saveUninitialized: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.engine('html', engines.mustache);
    app.set('view engine', 'html');
}

module.exports = {
    applyMiddlewares
}