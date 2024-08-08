const express = require('express');
const { getAllUser, getOneUser, createUser, updateUser, deleteUser } = require('../controllers/userCtrl');

const router = express.Router();

router.get('/users', getAllUser);
router.get('/users/:id', getOneUser);

router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

module.exports = router;