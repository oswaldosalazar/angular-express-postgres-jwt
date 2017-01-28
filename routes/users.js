var express = require('express');
var router = express.Router();
const userQueries = require('../database/user-queries')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/create', (req, res, next) => {
  bcrypt.genSalt(12, (err, salt) => {
    if(err) return next(err)
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if(err) return next(err)

      const token = jwt.sign(
        {username: req.body.username},
        process.env.JWT_SECRET,
        {expiresIn: '7 days'}
      )

      const user = {
        username: req.body.username,
        password: hash,
        jwt: token
      }

      userQueries.create(user)
        .then((id) => {
          const sanitizedUser = {
            username: user.username,
            jwt: user.jwt,
            id: id[0]
          }
          res.json(sanitizedUser)
        })
        .catch((err) => {
          console.error('There was a problem creating a user');
          next(err)
        })
    })
  })
})


router.post('/login', (req, res, next) => {

  const user = {
    username: req.body.username,
    password: req.body.password
  }
  console.log("User from route: ", user)

  userQueries.login(user)
    .then((id) => {
      bcrypt.compare(user.password, id[0].password, function(err, result) {
        if(result) {
          console.log("success");
          const sanitizedUser = {
            username: user.username,
            jwt: user.jwt,
            id: id[0]
          }
          res.json(sanitizedUser);
        } else {
          console.log("failure");
        }
      });
    })
})

module.exports = router;
