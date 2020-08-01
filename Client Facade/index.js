const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const uniqid = require('uniqid');
const dotenv = require('dotenv');
dotenv.config();



app.use(express.json());
app.use(bodyParser.json());

const {Post_client} = require('./Routes/client');
const {Post_user} = require('./Routes/user');
const {Post_notification} = require('./Routes/send_notification');

//post request for registering a client
app.post('/api/clientRegistration',Post_client);
//post request for registering a new user device
app.post('/api/userRegistration',Post_user);
//post request for sending notification
app.post('/api/send_notification',Post_notification);


const PORT = process.env.port || 3000;
app.listen(PORT, ()=>{
    console.log('server is running on port:'+ PORT);
});