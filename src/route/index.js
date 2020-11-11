const express = require('express');
const route = express.Router();
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const db = knex({

  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
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
const Index = require('../controllers/Index');
const AddProduct = require('../controllers/AddProduct');
const DeleteProduct = require('../controllers/DeleteProduct');
const verifyToken = require('../middleware/index');
const UpdateProduct = require('../controllers/UpdateProduct');
const MyProduct = require('../controllers/MyProduct');
const MyProfile = require('../controllers/MyProfile');
//----------------------------------

route.get('/market', (req, res) => Index(req, res, db));

route.post('/market/add', verifyToken, (req, res) =>
  AddProduct(req, res, db, jwt)
);
//----------------------------------
route.delete('/market/delete/:id', verifyToken, (req, res) =>
  DeleteProduct(req, res, db, jwt)
);

route.put('/market/update', verifyToken, (req, res) =>
  UpdateProduct(req, res, db, jwt)
);

route.post('/market/myproduct', verifyToken, (req, res) =>
  MyProduct(req, res, db)
);

route.post('/market/myprofile', verifyToken, (req, res) =>
  MyProfile(req, res, db)
);

module.exports = route;
