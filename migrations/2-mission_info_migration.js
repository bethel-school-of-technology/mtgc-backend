'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "missions_infos", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "mission_info_migration",
    "created": "2020-07-20T23:51:42.536Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "missions_infos",
        {
            "MissionId": {
                "type": Sequelize.INTEGER,
                "field": "MissionId",
                "primaryKey": true,
                "autoIncrement": true,
                "allowNull": false
            },
            "OrganizationName": {
                "type": Sequelize.STRING,
                "field": "OrganizationName"
            },
            "OrganizationStreetAddress": {
                "type": Sequelize.STRING,
                "field": "OrganizationStreetAddress"
            },
            "City": {
                "type": Sequelize.STRING,
                "field": "City"
            },
            "State": {
                "type": Sequelize.STRING,
                "field": "State"
            },
            "Zip": {
                "type": Sequelize.INTEGER,
                "field": "Zip"
            },
            "MissionLocationCity": {
                "type": Sequelize.STRING,
                "field": "MissionLocationCity"
            },
            "MissionLocationCountry": {
                "type": Sequelize.STRING,
                "field": "MissionLocationCountry"
            },
            "Verified": {
                "type": Sequelize.BOOLEAN,
                "field": "Verified"
            },
            "Username": {
                "type": Sequelize.STRING,
                "field": "Username"
            },
            "Image": {
                "type": Sequelize.BLOB,
                "field": "Image"
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
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
