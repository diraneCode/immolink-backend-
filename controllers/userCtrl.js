const User = require("../models/userModel")
const userValidation = require("../validators/userValidator")


const createUser = async (req, res) => {
    const { body } = req
    
    const { error } = userValidation(body)
    if(error) return res.status(401).json(error.details[0].message);
    try {
        const user = await User.create({...body})
        res.status(201).json({msg: "Utilisateur creer"})
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllUser = async (req, res) => {
    try{
        const user = await User.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        res.status(200).json(user);
    }catch(error){
        res.status(500).json(error);
    }
}


const getOneUser = async (req, res) => {
    const { id } = req.params
    try{
        const user = await User.findByPk(id);
        if(!user) return res.status(404).json({msg: "Utilisateur non trouver"})
        res.status(200).json(user);
    }catch(error){
        res.status(500).json(error);
    }

}

const updateUser = async(req, res) => {
    const { id } = req.params;
    const { body } = req;

    try{
        const user = await User.findByPk(id)
        if(!user) return res.status().json({msg: "Utilisateur non trouver"});
        try{
            user.nom = body.nom;
            const userUpdate = await user.save();
            res.status(201).json({msg: "Utilisateur modifier"})
        }catch(err){
            res.status(500).json(err);
        }
    }catch(error){
        return res.status(500).json(error);
    }

}

const deleteUser = async(req, res) => {
    const { id } = req.params;
    
    try{
        const user = await User.findByPk(id);
        if(!user) return res.status(404).json({msg: "Utilisateur non trouver"});
        try{
            await user.destroy();
            res.status(200).json({msg: "Utilisateur supprimer"});
        }catch(error){
            res.status(500).json(error)
        }
    }catch(error){
        res.status(500).json(error)
    }
}


module.exports = {
    getAllUser,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
}