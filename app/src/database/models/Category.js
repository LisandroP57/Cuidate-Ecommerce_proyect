module.exports = (sequelize, dataTypes) => {
    let alias = "Category";

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
    }

    let config = {
        tableName: "categories",
        timestamps: false,
    }

    const CATEGORY = sequelize.define(alias, cols, config);

    CATEGORY.associate = (models) => {
        CATEGORY.hasMany(models.Subcategory, {
            as: "subcategories",
            foreignKey: "category_id",
        })
    }

    return CATEGORY;
}