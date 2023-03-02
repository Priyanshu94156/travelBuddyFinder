const express= require('express');
const cors= require('cors');
const mongoose = require('mongoose');

const app = express();
const userRoutes = require('./mvc/routes/user');
const tripRoutes = require('./mvc/routes/trips');

app.use(cors());
app.use(express.json());
app.use('/user',userRoutes);
app.use('/trip',tripRoutes);

app.listen(3003);