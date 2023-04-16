/* module.exports = (sequelize, dataTypes) => {
    let alias = "Color_Product";

    let cols= {
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
    }

    let config = {
        tableName: "colors",
        timestamps: false,
    };

    const Color_Product = sequelize.define(alias, cols, config);

    
    return COLOR;
} */