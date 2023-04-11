module.exports = (sequelize, dataTypes) => {
    let alias = "ProductCategory";

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
        tableName: "products_categories",
        timestamps: false
    };

    const PRODUCT_CATEGORY = sequelize.define(alias, cols, config);

    PRODUCT_CATEGORY.associate = (models) => {
        PRODUCT_CATEGORY.hasMany(models.Product, {
            as: "products",
            foreignKey: "product_category_id",
        })
    }

    return PRODUCT_CATEGORY;
}