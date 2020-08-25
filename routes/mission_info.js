var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');


/* 
router.get('/mission_signup', function (req, res, next) {
  res.render('mission_signup');
}); */

router.post('/mission_signup', function (req, res, next) {
  let token = req.headers['authorization']
  console.log(token);
  console.log(req.body);
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          models.missions_info
            .findOrCreate({
              where: {
                OrganizationName: req.body.organizationName
              },
              defaults: {
                UserId: user.UserId,
                OrganizationStreetAddress: req.body.organizationStreetAddress,
                City: req.body.city,
                State: req.body.state,
                Zip: req.body.zip,
                OrganizationCountry: req.body.organizationCountry,
                MissionLocationCity: req.body.missionLocationCity,
                MissionLocationCountry: req.body.missionLocationCountry,
                Bio: req.body.bio,
                Image: req.body.file
              }
            })
            .spread(function (result, created) {
              if (created) {
                res.json({
                  message: 'Congratulations you are a mission with Mapping the Global Church',
                  status: 200
                })
              } else {
                res.json({
                  message: 'Mission creation failed',
                  status: 409
                })
              }
            })
        } else {
          res.json({
            message: 'token failed',
            status: 408
          })
        }
      })
  } else {
    res.json({
      message: 'User not loggend in'
    })
  }
});


router.get('/mission/:id', function (req, res, next) {
  models.mission_info
    .findByPk(parseInt(req.params.id))
    .then(mission_info => {
      if (mission_info) {
        res.render('profile-mission', {
          OrganizationName: mission_info.OrganizationName,
          OrganizationStreetAddress: mission_info.OrganizationStreetAddress,
          City: mission_info.city,
          State: mission_info.state,
          Zip: mission_info.zip,
          MissionLocationCity: mission_info.missionLocationCity,
          MissionLocationCountry: mission_info.missionLocationCountry
          
        });
      } else {
        res.res.json({
          message: 'This Mission has not been found',
          status: 401,
        });
      }
    });
});


router.get('/missionList', function (req, res, next) {
  models.missions_info
    .findAll({})
    .then(missionsFound => {
      res.setHeader('Content-Type', 'application/json');
      res.json(missionsFound);
    })
});



module.exports = router;