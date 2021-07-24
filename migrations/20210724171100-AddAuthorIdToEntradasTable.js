'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'Entradas',
            'authorId',
            {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id"
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('Entradas', 'authorId');
    }
};