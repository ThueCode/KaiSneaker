const express = require('express');
const bodyParser = require('body-parser');
const brandRoutes = require('./routers/brand.router');

const app = express();

//middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes

app.use('/api', brandRoutes);


module.exports = app;