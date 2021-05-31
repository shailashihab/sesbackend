const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/PROJECTSICTAK',{useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const AdminStudentSchema = new Schema({
    addLine1: String,
    addLine2: String,
    city: String,
    age:Number,
    Gender:String,
    contactNo: Number,
    country: String,
    email: String,
    firstName: String,
    lastName: String,
    pincode: Number,
    state: String,
    activities: String,
    description: String,
    endDate: String,
    fieldOfStudy: String,
    grade: String,
    highestDegree: String,
    school: String,
    startDate: String,
    skillsTextarea: String,
    logoInput:String,
    img_cloudinary_id:String,
    resumeInput:String,
    res_cloudinary_id:String

});


var AdminStudentData = mongoose.model('adminStudentdata',AdminStudentSchema);

module.exports = AdminStudentData;