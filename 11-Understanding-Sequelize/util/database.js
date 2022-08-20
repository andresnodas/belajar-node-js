const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'indonesia', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;