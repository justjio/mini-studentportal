const Student = require('../model/student');

exports.student = function(req, res) {
    Student.find({sex: "Male"})
        .exec(function(err, result) {
            if(err) {
                return err;
            }
            if(result==null) {
                const err = new Error('Sorry. No student with this ID.');
                err.status = 404;
                return err;
            }
            res.status(200).send({
                success: 'true',
                message: 'Student data successfully retrieved.',
                studentData: result
            });
        });
};