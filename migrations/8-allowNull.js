'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "UserId" on table "missions_infos"
 *
 **/

var info = {
    "revision": 8,
    "name": "allowNull",
    "created": "2020-08-16T00:31:29.685Z",
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
            "allowNull": true
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
