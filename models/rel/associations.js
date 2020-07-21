module.exports = function(models){
    models.users.belongsTo(models.missions_info,
        {foreignKey: "Username"
        });
}