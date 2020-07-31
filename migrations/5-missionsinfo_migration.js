'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "UserId" on table "missions_infos"
 *
 **/

var info = {
    "revision": 5,
    "name": "missionsinfo_migration",
    "created": "2020-07-26T01:09:55.640Z",
    "comment": ""
};

var migrationCommands = [{
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
