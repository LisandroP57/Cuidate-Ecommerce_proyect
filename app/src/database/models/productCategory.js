module.exports = (sequelize, dataTypes) => {
    let alias = "ProductCategory";

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
        tableName: "product_categories",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const ProductCategory = sequelize.define(alias, cols, config);

    ProductCategory.associate = (models) => {
        ProductCategory.hasMany(models.Product, {
            as: "products",
            foreignKey: "product_category_id",
        })
    }

    return ProductCategory
}