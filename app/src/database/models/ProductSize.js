module.exports = (sequelize, dataTypes) => {
    let alias = "ProductSize";

    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        size: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        product_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        }
    }

    let config = {
        tableName: "products_sizes",
        timestamps: false,
    };

    const PRODUCT_SIZE = sequelize.define(alias, cols, config);

    PRODUCT_SIZE.associate = (models) => {
        PRODUCT_SIZE.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        });
    }
 
    return PRODUCT_SIZE;
}