const express = require('express');
const app = express();

//Import bodyparser because of request coming script in frontend
const bodyParser = require('body-parser');

//Import cookieparser to allow cookie exchange between frontend and backend
const cookieParser = require('cookie-parser');

const studentAPI = require('./Routes/studentRouters');

const mongoose = require('mongoose');
const student_db_url = 'mongodb+srv://jiobiagbaDB:obidudu9293@cluster0-ywgnl.azure.mongodb.net/studentportal?retryWrites=true&w=majority';
mongoose.connect(student_db_url, {useNewUrlParser: true});
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.use(bodyParser.json());
app.use(cookieParser());

//CORS permission to allow XMLHttpRequest work across different domains
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/v1/student', studentAPI);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Student Portal server is running on port ${PORT}. Thank you.`)
});