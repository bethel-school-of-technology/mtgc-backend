var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');
const mysql = require('mysql2');

var bodyParser = require('body-parser');


const app = express(

  
);

/* GET users listing. */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api", (req, res) => {
  res.json("Hello");
});



// need post for creating a new user 
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password,
        PhoneNumber: req.body.phoneNumber,
        Bio: req.body.bio
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.json("Hello");
      } else {
        res.send('This user already exists');
      }
    });
});

router.get('/profile', function (req, res, next) {
  models.users
    .findAll({ })
    .then(usersFound => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(usersFound));
    })
});
//Login user and return JWT as cookie post below


router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.username,
      Password: req.body.password
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    }
    if (user) {
      let token = authService.signUser(user); // <--- Uses the authService to create jwt token
      res.cookie('jwt', token); // <--- Adds token to response as a cookie
      res.send(JSON.stringify('users'));
    } else {
      console.log('Wrong password');
      res.redirect('login')
    }
  });
});

//need get mtehod to pull profile page of user
/* router.get('/profile', function (req, res, next) {
  models.users
    .findByPk(parseInt(req.params.id))
    .then(user => {
      if (user) {
        res.render('profile', {
          FirstName: users.FirstName,
          LastName: users.LastName,
          Email: users.Email,
          Username: user.Username
        });
      } else {
        res.send('User not found');
      }
    });
}); */

// router.post('/login', function (req, res, next) {
//   models.users.findOne({
//     where: {
//       Username: req.body.username
//     }
//   }).then(user => {
//     if (!user) {
//       console.log('User not found')
//       return res.status(401).json({
//         message: "Login Failed"
//       });
//     } else {
//       let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
//       if (passwordMatch) {
//         let token = authService.signUser(user);
//         res.cookie('jwt', token);
//         res.send('Login successful');
//       } else {
//         console.log('Wrong password');
//         res.send('Wrong password');
//       }
//     }
//   }
//   });
// });

//need get method to pull profile page of user
// router.get('/profile', function (req, res, next) {
//   let token = req.cookies.jwt;
//   if (token) {
//     authService.verifyUser(token)
//       .then(user => {
//         if (user) {
//           res.send(JSON.stringify(user));
//         } else {
//           res.status(401);
//           res.send('Invalid authentication token');
//         }
//       });
//   } else {
//     let status;
//     if (req.user.Admin) {
//       status = 'Admin';
//     }
//   }
// });

// router.post('/login', function (req, res, next) {
//   models.users.findOne({
//     where: {
//       Username: req.body.username,

//     }
//   }).then(user => {
//     if (!user) {
//       console.log('User not found')
//       return res.status(401).json({
//         message: "Login Failed"
//       });
//     } else {
//       let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
//       if (passwordMatch) {
//         let token = authService.signUser(user);
//         res.cookie('jwt', token); //this doesn't work res.json
//         res.send('Login successful');
//       } else {
//         status = 'Normal user';
//       }

//       res.render('profile', {
//         FirstName: req.user.FirstName,
//         LastName: req.user.LastName,
//         Email: req.user.Email,
//         UserId: req.user.UserId,
//         Username: req.user.Username,
//         Status: status
//       });
//     }
//   });
// });

/* List all users for admin */
// router.get('/admin', function (req, res, next) {
//   let token = req.cookies.jwt
//   if (token) {
//     authService.verifyUser(token)
//       .then(user => {
//         if (user.Admin) {
//           models.users
//             .findAll({
//               where: { Deleted: false }
//             })
//             .then(usersFound => {
//               res.setHeader('Content-Type', 'application/json');
//               res.send(JSON.stringify(usersFound));
//             })
//         } else {
//           res.status(401);
//           res.send('Must be admin');
//         }
//       });
//   } else {
//     res.status(401);
//     res.send('Must be logged in');
//   }
// });

router.get('/admin', function (req, res, next) {
  models.users
    .findAll({ })
    .then(usersFound => {
      res.setHeader('Content-Type', 'application/json');
      res.json(usersFound);
    })
});
//need get method to pull profile page of user
router.get('/profile', function(req, res, next) {
  models.users
    .findAll({ })
    .then(user => {
      res.json({
       user: users
      });
    });
});

//below is logout function
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
});

module.exports = router;
