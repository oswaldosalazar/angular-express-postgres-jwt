var express = require('express');
var router = express.Router();
const userQueries = require('../database/user-queries')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/login', (req, res, next) => {

  const user = {
    username: req.body.username,
    password: req.body.password
  }

  userQueries.login(user)
    .then((data) => {
      console.log("Login user: ", data);
      res.json(data)
    })

  // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
  //   // res == true
  // });
})

module.exports = router;
