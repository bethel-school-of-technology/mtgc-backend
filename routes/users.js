var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//need post for creating a new user 
/*router.get('/signup', function(req, res, next) {
  res.render('signup');
});*/

router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: authService.hashPassword(req.body.password)
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.json('index');
      } else {
        res.send('This user already exists');
      }
    });
});


//Login user and return JWT as cookie post below
/*router.get('/login', function(req, res, next) {
  res.render('login');
<<<<<<< HEAD
});*/




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
router.get('/user/:id', function(req, res, next) {
  // if (!req.isAuthenticated()) {
  //   return res.send('You are not authenticated');
  // }
  if (req.params.id !== String(req.user.UserId)) {
    res.send('This is not your profile');
  } else {
    let status;
    if (req.user.Admin) {
      status = 'Admin';
=======
}); */
router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.username,
      
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    }else{    
      let passwordMatch = authService.comparePasswords(req.body.password, user.Password); 
      if(passwordMatch){
        let token = authService.signUser(user);
        res.cookie('jwt', token); //this doesn't work res.json
        res.send('Login successful');
>>>>>>> 10f2ce2cb4e874896f7fd60ad2285f5592f5ef51
    } else {
      status = 'Normal user';
    }

    res.render('profile', {
      FirstName: req.user.FirstName,
      LastName: req.user.LastName,
      Email: req.user.Email,
      UserId: req.user.UserId,
      Username: req.user.Username,
      Status: status
    });
  }
});

/*router.get('/profile-card', function(req, res, next) {
  res.render('profile-card');
});*/
router.get('/user/:id', function (req, res, next) {
  models.users
    .findByPk(parseInt(req.params.id))
    .then(user => {
      if (user) {
        res.render('profile-card', {
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          Username: user.Username
        });
      } else {
        res.send('User not found');
      }
    });
  });



//below is logout function
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
  });

module.exports = router;
