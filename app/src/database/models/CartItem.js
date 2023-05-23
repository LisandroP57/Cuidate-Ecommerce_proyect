module.exports = (sequelize, dataTypes) => {
    let alias = "cartItem";

    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        cartId: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        },
        productId: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        },
        quantity: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        },
    }

    let config = {
        tableName: "cart_items",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const CART_ITEM = sequelize.define(alias, cols, config);

    CART_ITEM.associate = (models) => {

        CART_ITEM.belongsTo(models.Product, {
            as: "products",
            foreignKey: "productId",
        });

        CART_ITEM.belongsTo(models.Cart, {
            as: "cart",
            foreignKey: "cartId",
        })
    }
        
    return CART_ITEM;
}