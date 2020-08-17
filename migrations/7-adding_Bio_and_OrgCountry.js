'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Bio" to table "missions_infos"
 * addColumn "OrganizationCountry" to table "missions_infos"
 *
 **/

var info = {
    "revision": 7,
    "name": "adding_Bio_and_OrgCountry",
    "created": "2020-08-15T00:09:25.213Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "missions_infos",
            "Bio",
            {
                "type": Sequelize.STRING,
                "field": "Bio"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "missions_infos",
            "OrganizationCountry",
            {
                "type": Sequelize.STRING,
                "field": "OrganizationCountry"
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
