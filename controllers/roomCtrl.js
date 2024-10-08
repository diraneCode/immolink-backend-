const { where } = require("sequelize");
const { db } = require("../databases/db");
const roomValidation = require("../validators/roomValidator");

const Room = db.Room


const createRoom = async (req, res) => {
    const { body } = req;
    const { error } = roomValidation(body);
    if(error) return res.status(401).json(error.details[0].message);
    try{
        await Room.create({...body});
        res.status(201).json({msg: "Chambre creer"});
    }catch(error){
        res.status(500).json(error);
    }
}

const getAllRoom = async (req, res) => {
    try{
        const room = await Room.findAll(
            {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        );
        res.status(200).json(room)
    }catch(error){
        res.status(500).json(error);
    }
}

const getOneRoom = async (req, res) => {
    const { id } = req.params;
    try{
        const room = await Room.findByPk(id,
            {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        );
        if(!room) return res.status(404).json({msg: "Aucune chambre trouver"});
        res.status(200).json(room)
    }catch(error){
        res.status(500).json(error)
    }
}

const updateRoom = async (req, res) => {
    const { id } = req.params;
    try{
        const room = await Room.findByPk(id);
        if(!room) return res.status(404).json({msg: "Aucune chambre trouver"});
        try{
            if(room.status == 'disponible'){
                room.status = 'indisponible'
            }else{
                room.status = 'disponible'
            }
            await room.save();
            res.status(201).json({msg: "Chambre modifier"}); 
        }catch(errror){
            res.status(500).json(error);
        }
    }catch(error){
        res.status(500).json(error)
    }
}

const deleteRoom = async (req, res) => {
    const { id } = req.params;

    try{
        const room = await Room.findByPk(id);
        if(!room) return res.status(404).json({msg: "Aucune chambre trouver"});
        try{
            Room.destroy({ where: {id: id }});
            res.status(200).json({msg: "Chambre supprimer"});
        }catch(error){
            res.status(500).json(error)
        }
    }catch(error){
        res.status(500).json(error);
    }
}


module.exports = {
    createRoom,
    getAllRoom,
    getOneRoom,
    updateRoom,
    deleteRoom
}