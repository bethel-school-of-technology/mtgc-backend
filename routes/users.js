var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//need post for creating a new user 
/* router.get('/signup', function(req, res, next) {
  res.render('signup');
}); */

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

/* router.get('/login', function(req, res, next) {
  res.render('login');
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
    } else {
      console.log('Wrong password');
      res.redirect('login')
  
    }
  }
  });
});

//need get method to pull profile page of user

//below is logout function
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
  });

module.exports = router;
