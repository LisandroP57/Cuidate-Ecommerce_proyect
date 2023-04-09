module.exports = (sequelize, dataTypes) => {
    let alias = "Rol";

    let cols= {
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
    }

    let config = {
        tableName: "user_roles",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const Rol = sequelize.define(alias, cols, config);

    Rol.associate = (models) => {
        Rol.hasMany(models.User, {
            as: "users",
            foreignKey: "user_rol_id",
        })
    }

    return Rol
}