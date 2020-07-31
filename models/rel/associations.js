module.exports = function (models) {
    models.users.belongsTo(models.missions_info,
        {
            foreignKey: 'UserId'
        });
    models.missions_info.hasMany(models.users,
        {
            foreignKey: 'UserId'
        })
}