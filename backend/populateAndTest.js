const async = require('async');
const Student = require('../backend/model/student');


const mongoose = require('mongoose');
const student_db_url = 'mongodb+srv://jiobiagbaDB:obidudu9293@cluster0-ywgnl.azure.mongodb.net/studentportal?retryWrites=true&w=majority';
mongoose.connect(student_db_url, {useNewUrlParser: true});
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB connection error: '));


let students = [];


function createStudent(first_name, last_name, date_of_birth, sex, hobby1, hobby2, hobby3, hobby4, hobby5, summary, email, password) {
    studentData = {
        first_name: first_name,
        last_name: last_name,
        date_of_birth: date_of_birth,
        sex: sex,
        hobby1: hobby1,
        hobby2: hobby2,
        hobby3: hobby3,
        hobby4: hobby4,
        hobby5: hobby5,
        summary: summary,
        email: email,
        password: password,
    };
    
    let newStudent = new Student(studentData);


    newStudent.save(function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Student Details: ' + newStudent);
    students.push(newStudent);
    });
};

async.series([
    function(callback) {createStudent('Bolaji', 'Anifowose', '2005-04-20', 'Male', 'Skiing', 'N/A', 'N/A', 'N/A', 'N/A', 'Shy but can be playful once he has adapted to the people around. A brillinat and caring soul also!', 'b.anifowose@gmail.com', 'Bolaji.2009');
    }
], 
    
function(err, results) {
    if (err) {
        console.log('Error: ' + err);
    } else {
        console.log('Results: ' + results);
    };
    mongoose.connection.close();
});

