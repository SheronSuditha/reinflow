// imports
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const l3routes = require('./routes/level3')

// port that backend uses to listen to incoming api calls
const PORT = process.env.PORT || 5000;

// starting point
const app = express()

// connection to mongodb
mongoose.connect('mongodb+srv://backenduser:buser@main.ssnqg.mongodb.net', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("db connection successful")).catch(error => console.error(error));

// Authroutes
const authRoute = require('./routes/auth')

// middlewares
app.use(express.json())
app.use('/api/user', authRoute)
app.use('/api/level3', l3routes)

// endpoint for / route
/**
 * @api {get} / gets the home page of backend
 * @apiDescription This route responds with the root route of the backend
 * @apiGroup Backend
 * @apiSucessExample Success-Response:
 * HTTP 200 OK
 * {
 *	Backend API / route
 * }
 * */
app.get('/', (req, res) => {
    res.status(200).send('Backend API / route');
});

// listen on assigned port
app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})