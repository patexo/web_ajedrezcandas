'use strict';

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable(
            'Entradas',
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                    unique: true
                },
                titular: {
                    type: Sequelize.STRING,
                    validate: {notEmpty: {msg: "Titular no debe de estar vacio."}}
                },
                articulo: {
                    type: Sequelize.STRING,
                    validate: {notEmpty: {msg: "Artículo no debe de estar vacio."}}
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                }
            },
            {
                sync: {force: true}
            }
        );
    },
    down(queryInterface, Sequelize) {
        return queryInterface.dropTable('Entradas');
    }
};