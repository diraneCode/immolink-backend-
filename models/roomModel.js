const { DataTypes } = require('sequelize')


module.exports = (sequelize) => {

    return Room = sequelize.define('room',{
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prix: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        ville: {
            type: DataTypes.STRING,
            allowNull: false
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        photo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        proprietaire: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        staut: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
}
