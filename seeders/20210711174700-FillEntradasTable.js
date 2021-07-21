'use strict';

module.exports = {
    up(queryInterface, Sequelize) {

        return queryInterface.bulkInsert('Entradas', [
            {
                titular: 'Creación de una página web',
                articulo: 'En el día de hoy el Club ajedrez Candás ha dado un paso más en el compromiso de mantener sus socios y simpatizantes informados.',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                titular: 'Actualización Servicios para los socios y simpatizantes',
                articulo: 'Se han creado los carnets para el uso y disfrute de los servicios.',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                titular: 'Un año más sin nuestro troneo de ajedrez Santísimo Cristo.',
                articulo: 'Debido a la situación actual por los problemas derivados de la alerta sanitaria por el COVID el torneo de ajedrez del Santísimo Cristo queda suspendido en este año 2021.',
                createdAt: new Date(),
                updatedAt: new Date()
            }            
        ]);
    },

    down(queryInterface, Sequelize) {

        return queryInterface.bulkDelete('Entradas', null, {});
    }
};