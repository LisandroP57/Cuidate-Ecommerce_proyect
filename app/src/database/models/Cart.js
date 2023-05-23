module.exports = (sequelize, dataTypes) => {
    let alias = "Cart";

    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        },
        state: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
    }

    let config = {
        tableName: "carts",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const CART = sequelize.define(alias, cols, config);

    CART.associate = (models) => {

        CART.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId",
        })

        CART.hasMany(models.CartItem, {
            as: "cartItems",
            foreignKey: "cartId",
        });
    }

    return CART;
}