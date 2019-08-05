const express = require('express');
const app = express();

const studentAPI = require('./Routes/studentRouters');

const mongoose = require('mongoose');
const student_db_url = 'mongodb+srv://jiobiagbaDB:obidudu9293@cluster0-ywgnl.azure.mongodb.net/studentportal?retryWrites=true&w=majority';
mongoose.connect(student_db_url, {useNewUrlParser: true});
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.use('/api/v1/getStudent', studentAPI);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Student Portal server is running on port ${PORT}. Thank you.`)
});