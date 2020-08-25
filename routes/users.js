var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');
const mysql = require('mysql2');

/* var bodyParser = require('body-parser'); */


/* const app = express(


);
 */
/* set header */
/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});  */





//need post for creating a new user 


router.post('/signup', function (req, res, next) {
  console.log(req.body)
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: authService.hashPassword(req.body.password),
        Missionary: req.body.missionary,
        PhoneNumber: req.body.phoneNumber,
        Bio: req.body.bio,
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.json({
          message: 'User created',
          status: 200

        });

      } else {
        res.json({
          message: 'This user already exists',
          status: 402
        });
      }
    });
});
//need post for login 
router.post('/signin', function (req, res, next) {
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
        res.json({
          message: 'Login successful',
          status: 200,
          accessToken: token
        });
      } else {
        console.log('Wrong password');
        res.json({
          message: 'invalid Password',
          status: 401,
        });;
      }
    }
  });
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
          res.json({
            message: 'Invalid authentication token',
            status: 401,
          });

        }
      });
  } else {
    res.status(401);
    res.json({
      message: 'Must be Signed In',
      status: 409,
    });
  }
});


//need get method to pull profile page of user
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
        res.json({
          message: 'User Not Found',
          status: 408,
        });
      }
    }
    )
});


/* List all users for admin */
router.get('/admin', function (req, res, next) {
  let token = req.headers['authorization']
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
          res.json({
            message: 'Restricted Access',
            status: 401,
          });
        }
      });
  } else {
    res.status(401);
    res.json({
      message: 'Must be Signed In',
      status: 409,
    });
  }
});




//below is logout function
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.json({
    message: 'Logged Out',
    status: 200,
  });;
});

module.exports = router;
