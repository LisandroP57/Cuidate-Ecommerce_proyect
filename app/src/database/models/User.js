module.exports = (sequelize, dataTypes) => {
    let alias = "User";

    let cols = {
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
        last_name: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(60),
            allowNull: false,
        },
        pass: {
            type: dataTypes.STRING(70),
            allowNull: false,
        },
        role: {
            type: dataTypes.STRING(2),
            allowNull: false,
            defaultValue: 0,
        },
        avatar: {
            type: dataTypes.STRING(255),
        },
        address: {
            type: dataTypes.STRING(50),
        },
    }
    
    let config = {
        tableName: "users",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const USER = sequelize.define(alias, cols, config);

    /* USER.associate = (models) => {
        USER.belongsTo(models.Role, {
            as: "role",
            foreignKey: "user_role_id",
        })
    } */

    return USER;
}