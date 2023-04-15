module.exports = (sequelize, dataTypes) => {
    let alias = "Color";

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

    const COLOR = sequelize.define(alias, cols, config);

    COLOR.associate = (models) => {
        COLOR.hasMany(models.Product, {
            as: "products",
            through: "color_product",
            foreignKey: "color_id",
            otherKey: "product_id",
            timestamps: false,
        })
    }

    return COLOR;
}