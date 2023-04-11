module.exports = (sequelize, dataTypes) => {
    let alias = "Product";

    let cols = {
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
        description: {
            type: dataTypes.STRING(255),
            allowNull: false 
        },
        category: {
            type: dataTypes.ENUM('in-sale', 'visited'),
            allowNull: false,
        },
        price: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        discount: {
            type: dataTypes.DECIMAL(5,2),
            defaultValue: 0.0,
        },
    }
    
    let config = {
        tableName: "products",
        createdAt: "created_at",
        updatedAt: "updated_at" 
    };

    const PRODUCT = sequelize.define(alias, cols, config);

    PRODUCT.associate = (models) => {
        PRODUCT.belongsTo(models.ProductCategory, {
            as: "productcategory",
            foreignKey: "product_category_id",
        })
        
        PRODUCT.belongsToMany(models.Color, {
            as: "colors",
            through: "color_product",
            foreignKey: "product_id",
            otherKey: "color_id",
            timestamps: false,
        })

        PRODUCT.belongsToMany(models.ProductImage, {
            as: "product_images",
            through: "image_product",
            foreignKey: "product_id",
            otherKey: "image_id",
            timestamps: false,
        })
    }

    return PRODUCT;
}