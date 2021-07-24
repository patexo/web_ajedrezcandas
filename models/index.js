const path = require('path');

// Load ORM
const Sequelize = require('sequelize');


// Environment variable to define the URL of the data base to use.
// To use SQLite data base:
//    DATABASE_URL = sqlite:ajedrezcandas.sqlite
const url = process.env.DATABASE_URL || "sqlite:ajedrezcandas.sqlite";

const sequelize = new Sequelize(url);

// Import the definition of the Noticia Table from noticia.js
// sequelize.import(path.join(__dirname, 'noticia'));

// Import the definition of the Entrada Table from entrada.js
const Entrada = sequelize.import(path.join(__dirname, 'entrada'));

// Import the definition of the Users Table from user.js
const User = sequelize.import(path.join(__dirname,'user'));

// Session
sequelize.import(path.join(__dirname,'session'));

// Relation 1-to-N between User and Quiz:
User.hasMany(Entrada, {as: 'entradas', foreignKey: 'authorId'});
Entrada.belongsTo(User, {as: 'author', foreignKey: 'authorId'});


module.exports = sequelize;