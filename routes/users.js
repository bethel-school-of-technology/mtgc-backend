var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');
const mysql = require('mysql2');

var bodyParser = require('body-parser');


const app = express(

  
);

/* set header */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});





//need post for creating a new user 


router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
         firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.username,email,
    username: req.body.username, 
    password: authService.hashPassword(req.body.password),
    missionary: req.body.missionary,
    phoneNumber: req.body.phoneNumber,
    bio: req.body.bio,
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});
//need post for login 
router.post('/signin', function(req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.send('Login successful');
      } else {
        console.log('Wrong password');
        res.send('Wrong password');
      }
    }
  });
});

//need post getting profiles
router.get('/profile', function (req, res, next) {
  models.users
    .findAll({ })
    .then(users => {
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
    })
});
//Login user and return JWT as cookie post below

router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.send(JSON.stringify(user));
        } else {
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});


//need get mtehod to pull profile page of user
router.get('/profile/:id', function (req, res, next) {
  models.users
    .findByPk(parseInt(req.params.id))
    .then(user => {
      if (user) {
        res.render('profile', {
          firstName: user.firstName,
          lastName: userlLastName,
          email: usereEmail,
          username: user.username
        });
      } else {
        res.send('User not found');
      }
    });
  });









/* List all users for admin */
 router.get('/admin', function (req, res, next) {
   let token = req.cookies.jwt
 if (token) {
    authService.verifyUser(token)
     .then(user => {
        if (user.Admin) {
          models.users
             .findAll({
               where: { Deleted: false }
            })
            .then(usersFound => {
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify(usersFound));
            })
       } else {
           res.status(401);
           res.send('Must be admin');
         }
       });
   } else {
     res.status(401);
     res.send('Must be logged in');
   }
 });




//below is logout function
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
});

module.exports = router;
