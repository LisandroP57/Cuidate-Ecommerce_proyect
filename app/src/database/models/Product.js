module.exports = (sequelize, dataTypes) => {
    let alias = "Product";

    let cols = {
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
        description: {
            type: dataTypes.STRING(255),
            allowNull: false 
        },
        image: {
            type: dataTypes.STRING(255),
            allowNull: true,
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
            allowNull: false,
        },
        color_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
        product_category_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
    }
    
    let config = {
        tableName: "products",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const Product = sequelize.define(alias, cols, config);

    return Product;
}