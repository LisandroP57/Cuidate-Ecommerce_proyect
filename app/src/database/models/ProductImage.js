module.exports = (sequelize, dataTypes) => {
    let alias = "ProductImage";

    let cols= {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
    }

    let config = {
        tableName: "product_images",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const ProductImage = sequelize.define(alias, cols, config);

    ProductImage.associate = (models) => {
        ProductImage.hasMany(models.Product, {
            as: "products",
            through: "image_product",
            foreignKey: "image_id",
            otherKey: "product_id",
            timestamps: false,
        })
    }

    return ProductImage
}