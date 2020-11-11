//Login
//Register
//Edit Profile
//Delete Profile

//Adding
//Deleteing by the logined in user
//Edting By the logged In User

//Route
//Controller
//
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}
const express = require('express');
// const axios = require('axios');
// const knex = require('knex');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

//extract from route
const user = require('./route/user');
const Index = require('./route/index');

const app = express();
app.use(bodyParser.json());
app.use(cors());
//Welcome Landing Page

app.get('/', (req, res) => {
  res.json('Welcome User');
});

//User Actions : Login And Registration
app.use('/', user);
app.use('/', Index);

//listen port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening from ${PORT}`);
});
