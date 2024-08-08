const { Sequelize } = require("sequelize");
const dotenv = require('dotenv').config()

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

const connect = async () => {
    try{
        await sequelize.sync();
        console.log("Base de donnee connecter");
    }catch(error){
        console.log(`Echec de connexion a la base de donnee : ${error}`);
    }
}

/*** Mise en place des relations */
const db = {}
db.sequelize = sequelize
db.User = require('../models/userModel')(sequelize)
db.Room = require('../models/roomModel')(sequelize)

db.User.hasMany(db.Room)
db.Room.belongsTo(db.User)

module.exports = {
    db,
    connect
};