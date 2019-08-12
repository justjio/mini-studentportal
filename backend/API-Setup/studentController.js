const Student = require('../model/student');

//Dummy controller function for getting 1 student
exports.student = function(req, res) {
    Student.find({sex: "Female"})
        .exec(function(err, result) {
            if(err) {
                res.status(400).send({
                    success: 'false',
                    message: err
                });
                return;
            }
            if(result.length === 0 || result == null) {
                res.status(404).send({
                    success: 'false',
                    message: 'Sorry. No student found with this record.'
                });
            } else {
                res.status(200).send({
                    success: 'true',
                    message: 'Student data successfully retrieved.',
                    studentData: result
                });
            }
        });
};

//Dummy controller code for logging in student
exports.login = [
    (req, res) => {
        Student.find({email: "b.anifowose@gmail.com", password: "Bolaji.2009"})
        .exec((err, result) => {
            if(err) {
                res.status(400).send({
                    success: 'false',
                    message: err
                });
                return;
            }
            if(result.length === 0 || result == null) {
                res.status(404).send({
                    success: 'false',
                    message: 'Sorry but your record is not in our database.'
                });
                return;
            }
            //res.cookie('studentID', result[0]._id);
            res.status(200).send({
                success: 'true',
                message: 'Student record found',
                studentData: result
            });
            return;
        });
    }
]


//Dummy controller code for registering 1 student
exports.student_register_post = [
    (req, res, next) => {
        const newStudent = new Student({
            first_name: 'Martha',
            last_name: 'Michaels',
            date_of_birth: '2000-12-24',
            sex: 'Female',
            hobby1: 'Programming',
            hobby2: 'Dancing',
            hobby3: 'Partying',
            hobby4: 'Cooking',
            hobby5: 'Travelling',
            summary: 'Martha Michaels is an outspoken lover of life and enjoyment to the fullest. At a height of 5ft 9inches, she is a tall, beautiful girl with brains.',
            email: 'marthamichaels2000@yahoo.co.uk',
            password: 'NAUGHTY.me@2019'
        });

        newStudent.save(function (err) {
            if(err) {
                res.status(400).send({
                    success: false,
                    message: err
                });
                return;
            };

            res.status(200).send({
                success: true,
                message: 'Your details have been successfully saved. Thank you.'
            });
            return;
        });

    }

];