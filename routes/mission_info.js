var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');



/*router.get('/mission_signup', function(req, res, next) {
    res.render('mission_signup');
  });*/
  
  router.post('/mission_signup', function(req, res, next) {
    models.mission_info
      .findOrCreate({
        where: {
          OrganizationName: req.body.organizationname
        },
        defaults: {
          OrganizationStreetAddress: req.body.organizationStreetAddress,
          City: req.body.lastName,
          State: req.body.email,
          Zip: req.body.zip,	  MissionLocationCity:req.body.missionLocationCity,
      MissionLocationCountry: req.body.missionLocationCountry
  
        }
      })
      .spread(function(result, created) {
        if (created) {
          res.redirect('mission_signup');
        } else {
          res.send('This Organization already exists');
        }
      });
  });

 /*router.get('/profile-mission', function(req, res, next) {
    res.render('profile-mission');
  });*/
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
          res.send('Organization not found');
        }
      });
    });






module.exports = router;