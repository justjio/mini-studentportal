const Student = require('../model/student');

//Require modules for validation and sanitization
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

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
    //First validate user input
    body('email', 'Please type in your email.').isLength({min: 6}).trim(),
    body('password','Password cannot be left blank and must be at least 7 characters.').isLength({min: 7}).trim(),

    //Then sanitize validated data
    sanitizeBody('*').escape(),

    (req, res) => {
        //Collect errors from the validation process
        const errors = validationResult(req);

        //If there are validation errors, send the errors back to frontend
        if(!errors.isEmpty()) {
            //Return Bad Request Status with message
            res.status(400).send({
                success: 'false',
                message: errors.array()
            });
            return;
        } else {
            // Collect validated and sanitized data
            const student = new Student({
                email: req.body.email,
                password: req.body.password
            });

            //Use data to query database
            Student.find({email: student.email, password: student.password})
            .exec((err, result) => {
                if(err || result.length === 0 || result == null) {
                    //Return Not Found Status with message
                    res.status(404).send({
                        success: 'false',
                        message: 'Sorry but your record is not in our database.'
                    });
                    return;
                }
                //Save studentdata as cookie
                res.cookie('studentID', result);
                console.log(result);
                //Return OK Status with studentResult
                res.status(200).send({
                    success: 'true',
                    message: 'Student record found',
                    studentData: result
                });
                return;
            });
        }


    }
]


//Dummy controller code for registering 1 student
exports.student_register_post = [
    //Validate user data
    body('firstname', 'Please type in your firstname.').isLength({min: 2}).trim(),
    body('surname', 'Please type in your surname.').isLength({min: 2}).trim(),
    body('date_of_birth', 'Your date of birth must be specified.').optional({checkFalsy: true}).isISO8601(),
    body('hobby1', 'At least 1 hobby must be specified.').isLength({min: 2}).trim(),
    body('hobby2', 'Type NA if there is no Hobby 2.').isLength({min: 2}).trim(),
    body('hobby3', 'Type NA if there is no Hobby 3.').isLength({min: 2}).trim(),
    body('hobby4', 'Type NA if there is no Hobby 4.').isLength({min: 2}).trim(),
    body('hobby5', 'Type NA if there is no Hobby 5.').isLength({min: 2}).trim(),
    body('summary', 'A brief summary of you is needed.').isLength({min: 1}).trim(),
    body('email', 'Please type in your email.').isLength({min: 6}).trim(),
    body('password', 'Password cannot be left blank and must be at least 7 characters.').isLength({min: 7}).trim(),

    //Sanitize all data
    sanitizeBody('*').escape(),

    (req, res, next) => {
        //Collect errors from validation steps
        const errors = validationResult(req);

        //Return errors to frontend if any
        if(!errors.isEmpty()) {
            //Return Bad Request
            res.status(400).send({
                success: 'false',
                message: errors.array()
            });
            return;
        } else {
            console.log(req.body);
            //Check if the email inputted by user already exists in database
            Student.findOne({email: req.body.email}).exec((err, student_present)=> {
                if(err) {
                    res.status(400).send({
                        success: 'false',
                        message: 'For some reasons, there was an error in the request.'
                    });
                    return;
                } 
                
                if(student_present) {
                    console.log(student_present);
                    res.status(400).send({
                        success: 'false',
                        message: 'It seems you have registered in the past. Please login to access your page.'
                    });
                    return;
                } else if(!student_present) {
                    //Create a new student object
                    const newStudent = new Student({
                        first_name: req.body.firstname,
                        last_name: req.body.surname,
                        date_of_birth: req.body.date_of_birth,
                        sex: req.body.sex,
                        hobby1: req.body.hobby1,
                        hobby2: req.body.hobby2,
                        hobby3: req.body.hobby3,
                        hobby4: req.body.hobby4,
                        hobby5: req.body.hobby5,
                        summary: req.body.summary,
                        email: req.body.email,
                        password: req.body.password
                    });

                    console.log(newStudent);
                    //Save student data
                    newStudent.save(function (err) {
                        if(err) {
                            res.status(400).send({
                                success: 'false',
                                message: 'There is a problem saving your data.'
                            });
                            return;
                        };
            
                        res.status(200).send({
                            success: 'true',
                            message: 'Your details have been successfully saved. Thank you.'
                        });
                        return;
                    });
                }
            })
        }
    }

];