'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Deleted" to table "users"
 * changeColumn "UserId" on table "missions_infos"
 * changeColumn "Missionary" on table "users"
 * changeColumn "Admin" on table "users"
 *
 **/

var info = {
    "revision": 9,
    "name": "addDeleted",
    "created": "2020-08-25T18:43:01.667Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "users",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "default": 0
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "missions_infos",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "allowNull": false
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
                "default": 0
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "Admin",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Admin",
                "default": 0
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
