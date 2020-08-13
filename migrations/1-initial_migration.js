'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2020-07-14T16:42:57.956Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "users",
        {
            "UserId": {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "primaryKey": true,
                "autoIncrement": true,
                "allowNull": false
            },
            "FirstName": {
                "type": Sequelize.STRING,
                "field": "FirstName"
            },
            "LastName": {
                "type": Sequelize.STRING,
                "field": "LastName"
            },
            "Email": {
                "type": Sequelize.STRING,
                "field": "Email",
                "unique": true
            },
            "Username": {
                "type": Sequelize.STRING,
                "field": "Username",
                "unique": true
            },
            "Password": {
                "type": Sequelize.STRING,
                "field": "Password"
            },
            "Admin": {
                "type": Sequelize.BOOLEAN,
                "field": "Admin"
            },
            "Missionary": {
                "type": Sequelize.BOOLEAN,
                "field": "Missionary"
            },
            "PhoneNumber": {
                "type": Sequelize.STRING,
                "field": "PhoneNumber"
            },
            "Bio": {
                "type": Sequelize.STRING,
                "field": "Bio"
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt"
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt"
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
