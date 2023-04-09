module.exports = (sequelize, dataTypes) => {
    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
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
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        avatar: {
            type: dataTypes.STRING(255),
            allowNull: true,
        },
        address: {
            type: dataTypes.STRING(100),
            allowNull: true,
        },
    }
    
    let config = {
        tableName: "users",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.belongsTo(models.Rol, {
            as: "rol",
            foreignKey: "user_rol_id",
        })
    }

    return User
}