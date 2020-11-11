const express = require('express');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_URL,
    ssl: true
    //host: process.env.HOST,
    // user: process.env.USER,
    // password: process.env.PASSWORD,
    // database: process.env.DATABASE,
  },
});
// const db = knex({
//   client: 'pg',
//   connection: {
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//   },
// });
const Login = require('../controllers/Login');
const Register = require('../controllers/Register');
const route = express.Router();

//Login
route.post('/login', (req, res) => Login(req, res, db, bcrypt, jwt));
//Register
route.post('/register', (req, res) => Register(req, res, db, bcrypt, jwt));

module.exports = route;
