const {db} = require("../databases/db")
const userValidation = require("../validators/userValidator")
const jwt = require('jsonwebtoken')

const User = db.User

const createUser = async (req, res) => {
    const { body } = req
    
    const { error } = userValidation(body)
    if(error) return res.status(401).json(error.details[0].message);
    try {
        await User.create({...body})
        res.status(201).json({msg: "Utilisateur creer"})
    } catch (error) {
        res.status(500).json(error);
    }
    console.log(User);
    
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

const singupUser = async (req, res) => {
    const { body } = req;
    const { error } = userValidation(body);
    if(error) return res.status(401).json(error.details[0].message)
    try{
        const user = await User.create({...body});
        const token = jwt.sign(
            {
                id: user.id,
                nom: user.nom,
                email: user.email,
                telephone: user.telephone,
                status: user.status
            },
            process.env.TOKEN_KEY
        )
        user.token = token
        return res.status(201).json({ msg: user })
    }catch(error){
        res.status(500).json(error)
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ where: {email: email}});
        if(!user) return res.status(404).json({msg: "Aucun user trouver"});
        if(user.password === password){
            const token = jwt.sign(
                {
                    id: user.id,
                    nom: user.nom,
                    email: user.email,
                    telephone: user.telephone
                },
                process.env.TOKEN_KEY
            )
            user.token
            res.status(200).json({msg: user});
        }else{
            res.status(200).json({msg: "Non authentifier"});            
        }
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
            await user.save();
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
    deleteUser,
    loginUser,
    singupUser
}