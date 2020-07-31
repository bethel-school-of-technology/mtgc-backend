var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');

const app = express();
const port = process.env.SERVER_PORT||8000;

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
app.listen(port, () => console.log(`Listening on port ${port}`));

var bodyParser = require('body-parser');
const app = express();
const port = process.env.SERVER_PORT || 8000;


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

app.listen(port, () => console.log(`Listening on port ${port}`));

//need post for creating a new user 
/*router.get('/signup', function(req, res, next) {
  res.render('signup');
});*/

app.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password
      }
    })
    .spread(function(result, created) {
      if (created) {
<<<<<<< HEAD
        res.json("Hello"); 
=======
        res.json('index');
>>>>>>> 003304b47103b9a4de72533c0d1c41f25926d89b
      } else {
        res.send('This user already exists');
      }
    });
});


//Login user and return JWT as cookie post below
<<<<<<< HEAD


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
=======
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
>>>>>>> 003304b47103b9a4de72533c0d1c41f25926d89b

//need get method to pull profile page of user
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
<<<<<<< HEAD
    res.status(401);
    res.send('Must be logged in');
=======
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
>>>>>>> 003304b47103b9a4de72533c0d1c41f25926d89b
  }
});



//below is logout function
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
  });

module.exports = router;
