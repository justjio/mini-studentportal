const express = require('express');

const app = express();

const mongoose = require('mongoose');
const student_db_url = 'mongodb+srv://jiobiagbaDB:obidudu9293@cluster0-ywgnl.azure.mongodb.net/studentportal?retryWrites=true&w=majority';
mongoose.connect(student_db_url, {useNewUrlParser: true});
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.get({});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Student Portal server is running on port ${3000}. Thank you.`)
});
