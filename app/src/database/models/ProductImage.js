module.exports = (sequelize, dataTypes) => {
    let alias = "ProductImage";

    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        product_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        },
    }

    let config = {
        tableName: "products_images",
        timestamps: false,
    }

    const PRODUCT_IMAGE = sequelize.define(alias, cols, config);

    PRODUCT_IMAGE.associate = (models) => {
        PRODUCT_IMAGE.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id",
        });
    }

    return PRODUCT_IMAGE;
}