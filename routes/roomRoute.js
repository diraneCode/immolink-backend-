const express = require('express');
const { getAllRoom, getOneRoom, deleteRoom, updateRoom, createRoom } = require('../controllers/roomCtrl');

const router = express.Router();

router.get('/rooms', getAllRoom);
router.get('/rooms/:id', getOneRoom);

router.post('/rooms', createRoom);
router.put('/rooms/:id', updateRoom);
router.delete('/rooms/:id', deleteRoom);


module.exports = router;