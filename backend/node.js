const express= require('express');
const cors= require('cors');
const mongoose = require('mongoose');

const app = express();
const userRoutes = require('./mvc/routes/user');

app.use(cors());
app.use(express.json());
app.use('/user',userRoutes);

app.listen(3003);