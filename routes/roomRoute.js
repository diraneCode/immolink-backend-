const express = require('express');
const { getAllRoom } = require('../controllers/roomCtrl');

const router = express.Router()

router.get('/rooms', getAllRoom);


module.exports = router;