const express = require('express');
const UserRouter = require('./routes/userRoute');
require('dotenv').config()

const db = require('./databases/db')


const app = express();
app.use(express.json());
app.use(UserRouter);

db.connect();

const port = process.env.PORT
app.listen(port, () => console.log(`Serveur demarrer sur le port ${port}`))