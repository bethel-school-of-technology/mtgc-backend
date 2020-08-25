const jwt= require('jsonwebtoken');
const models = require('../models');
const bcrypt = require("bcryptjs");
const { use } = require('../routes/users');

var authService = {
    signUser: function(user) {
      const token = jwt.sign(
        {
          username: user.Username,
          userId: user.UserId,
          admin: user.Admin
        },
        'secretkey',
        {
          expiresIn: '1h'
        }
        
      );
      return token;
    },

   

    verifyUser: function (token) {  
      try {
        console.log(token);
        let decoded = jwt.verify(token, 'secretkey'); 
        console.log(decoded.userId);
        return models.users.findByPk(decoded.userId); 

      } catch (err) {
        console.log(err);
        return null;
      }
    },
    hashPassword: function(plainTextPassword) {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(plainTextPassword, salt);
      return hash;
    },
    comparePasswords: function (plainTextPassword, hashedPassword) {
      return bcrypt.compareSync(plainTextPassword, hashedPassword)
    },

    
  
  }
  
  module.exports = authService;