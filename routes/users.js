var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');
const mysql = require('mysql2');
const config = require("../config/auth.config");
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





//need post for creating a new user 


app.post('/signup', function (req, res, next) {
  // Save User to Database
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
    password: bcrypt.hashSync(req.body.password, 8),
    missionary: req.body.missionary,
    phoneNumber: req.body.phoneNumber,
    bio: req.body.bio,
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

router.post('/signin') = (req, res,next) => {
  models.users
  Users.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

     
    })
  }


router.get('/profile', function (req, res, next) {
  models.users
    .findAll({ })
    .then(users => {
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
    })
});
//Login user and return JWT as cookie post below




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
      res.send(JSON.stringify(usersFound));
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
