module.exports = (sequelize, dataTypes) => {
    let alias = "Subcategory";

    let cols= {
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
        category_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        }
    }

    let config = {
        tableName: "subcategories",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const SUBCATEGORY = sequelize.define(alias, cols, config);

    SUBCATEGORY.associate = (models) => {
        SUBCATEGORY.hasMany(models.Product, {
            as: "products",
            foreignKey: "subcategory_id",
        });

        SUBCATEGORY.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        });
    }

    return SUBCATEGORY;
}