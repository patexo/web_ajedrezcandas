const {Model} = require('sequelize');

// Definition of the Entrada model:

module.exports = (sequelize, DataTypes) => {

    class Entrada extends Model {}

    Entrada.init({
            titular: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Titular must not be empty"}}
            },
            articulo: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Artículo must not be empty"}}
            }
        }, {
            sequelize
        }
    );

    return Entrada;
};