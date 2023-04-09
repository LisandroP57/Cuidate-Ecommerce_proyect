module.exports = (sequelize, dataTypes) => {
    let alias = "Color";

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
        tableName: "colors",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const Color = sequelize.define(alias, cols, config);

    Color.associate = (models) => {
        Color.hasMany(models.Product, {
            as: "products",
            foreignKey: "color_id",
        })
    }

    return Color
}