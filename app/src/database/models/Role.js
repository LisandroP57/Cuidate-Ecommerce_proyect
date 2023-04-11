module.exports = (sequelize, dataTypes) => {
    let alias = "Role";

    let cols= {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
    }

    let config = {
        tableName: "users_roles",
        timestamps: false
    };

    const ROLE = sequelize.define(alias, cols, config);

    ROLE.associate = (models) => {
        ROLE.hasMany(models.User, {
            as: "users",
            foreignKey: "user_role_id",
        })
    }

    return ROLE;
}