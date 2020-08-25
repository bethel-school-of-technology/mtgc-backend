'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "Admin" on table "users"
 * changeColumn "Missionary" on table "users"
 * changeColumn "Deleted" on table "users"
 *
 **/

var info = {
    "revision": 10,
    "name": "updateDefaults",
    "created": "2020-08-25T18:45:55.455Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "users",
            "Admin",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Admin",
                "default": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "Missionary",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Missionary",
                "default": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "default": false
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
