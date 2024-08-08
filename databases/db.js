const { Sequelize } = require("sequelize");
const dotenv = require('dotenv').config()

const dbOption = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

const connect = async () => {
    try{
        await dbOption.sync();
        console.log("Base de donnee connecter");
    }catch(error){
        console.log(`Echec de connexion a la base de donnee : ${error}`);
    }
}

module.exports = {
    dbOption,
    connect
};