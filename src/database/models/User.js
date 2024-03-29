module.exports = (sequelize, dataTypes) => {
    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
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
        phone: {
            type: dataTypes.INTEGER(20),
        },
        role: {
            type: dataTypes.INTEGER(2),
            allowNull: false,
            defaultValue: 0
        },
        avatar: {
            type: dataTypes.STRING(100),
        },
        googleId: {
            type: dataTypes.STRING(100),
        },
        address: {
            type: dataTypes.STRING(100),
        },
        postal_code: {
            type: dataTypes.STRING(10),
        },
        province: {
            type: dataTypes.STRING(100),
        },
        city: {
            type: dataTypes.STRING(100),
        },
    }
    
    let config = {
        tableName: "users",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const USER = sequelize.define(alias, cols, config);

    return USER;
}