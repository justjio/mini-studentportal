const moment = require('moment');
const mongoose = require('mongoose');
require('mongoose-type-email');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    first_name: {type: String, required: true, max: 80},
    last_name: {type: String, required: true, max: 80},
    date_of_birth: {type: Date},
    sex: {type: String, required: true, enum: ['Male', 'Female'], default: 'Male'},
    hobby1: {type: String, required: true},
    hobby2: {type: String},
    hobby3: {type: String},
    hobby4: {type: String},
    hobby5: {type: String},
    summary: {type: String, required: true},
    email: {type: mongoose.SchemaTypes.Email, required: true},
    password: {type: String, required: true, max: 50}
});

StudentSchema.virtual('fullname').get(function() {
    return this.first_name + ' ' + this.last_name;
});

StudentSchema.virtual('age').get(function() {
    return moment().year() - moment(this.date_of_birth).year;
});

module.exports = mongoose.model('Student', StudentSchema);
