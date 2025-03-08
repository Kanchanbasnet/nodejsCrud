const express = require('express');
const app = express();
const router = require('../src/routes/user.routes')
const dotenv = require('dotenv');
const { errorHandler } = require('./middlewares/errorhandler');
dotenv.config();

app.use(express.json())

app.use('/api/users', router)
app.use(errorHandler)


module.exports = app;