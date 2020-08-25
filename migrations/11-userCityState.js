'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "UserState" to table "users"
 * addColumn "UserCity" to table "users"
 *
 **/

var info = {
    "revision": 11,
    "name": "userCityState",
    "created": "2020-08-25T18:58:49.054Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "users",
            "UserState",
            {
                "type": Sequelize.STRING,
                "field": "UserState"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "UserCity",
            {
                "type": Sequelize.STRING,
                "field": "UserCity"
            }
        ]
    }
];

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
