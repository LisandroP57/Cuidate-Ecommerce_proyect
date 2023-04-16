module.exports = (sequelize, dataTypes) => {
    let alias = "Product";

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
        description: {
            type: dataTypes.STRING(255),
        },
        price: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        },
        discount: {
            type: dataTypes.INTEGER(10),
            defaultValue: 0.0,
        },
        subcategory_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        },
    }
    
    let config = {
        tableName: "products",
        createdAt: "created_at",
        updatedAt: "updated_at" 
    };

    const PRODUCT = sequelize.define(alias, cols, config);

    PRODUCT.associate = (models) => {
        PRODUCT.belongsTo(models.Subcategory, {
            as: "subcategory",
            foreignKey: "subcategory_id",
        });
        
        PRODUCT.hasMany(models.ProductImage, {
            as: "images",
            foreignKey: "product_id",
        });

        PRODUCT.belongsToMany(models.Color, {
            as: "colors",
            through: "color_product",
            foreignKey: "product_id",
            otherKey: "color_id",
            timestamps: false,
        });
    }

    return PRODUCT;
}