module.exports = (sequelize, dataTypes) => {
    let alias = "ProductColor";

    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        color: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        product_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        }
    }

    let config = {
        tableName: "products_colors",
        timestamps: false,
    };

    const PRODUCT_COLOR = sequelize.define(alias, cols, config);

    PRODUCT_COLOR.associate = (models) => {
        PRODUCT_COLOR.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        });
    }
 
    return PRODUCT_COLOR;
}