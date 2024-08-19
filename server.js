const express = require('express');
const UserRouter = require('./routes/userRoute');
const roomRouter = require('./routes/roomRoute');
require('dotenv').config();


const db = require('./databases/db')


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(UserRouter);
app.use(roomRouter);

db.connect();

const port = process.env.PORT
app.listen(port, () => console.log(`Serveur demarrer sur le port ${port}`))