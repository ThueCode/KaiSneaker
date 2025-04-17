const express = require('express');
const bodyParser = require('body-parser');
const brandRoutes = require('./routers/brand.router');
const roleRouters = require('./routers/role.router');
const userRouter = require('./routers/user.router');

const app = express();

//middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes

app.use('/api', brandRoutes);
app.use('/api', roleRouters);
app.use('/api',userRouter);

module.exports = app;