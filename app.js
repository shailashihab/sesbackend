const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
const formidable = require('express-formidable');

const PORT = process.env.PORT || 3000;
// const BookData = require('./src/model/bookData');
const AdminStudentData = require('./src/models/AdminStudentData');

//File handling in post form
const cloudinary = require('cloudinary').v2;
const path = require('path');
cloudinary.config({
    cloud_name:'lib01app',
    api_key:'792846327685179',
    api_secret:'aVxWoopNkvoXS497o9Unks_L24c'
})
 
var multer = require('multer');

var storage = multer.diskStorage({});

var upload = multer({ storage: storage });

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(formidable());

app.get('/adminStudent', async function(req, res, next) {
    await AdminStudentData.find()
    .then(function(students){
        res.send(students);
    });
});
// app.post('/adminStudent/add', async function (req, res, next){
//     var newStudent = new AdminStudentData({
//         addLine1: req.body.PersonalDetails.addLine1,
//         addLine2: req.body.PersonalDetails.addLine2,
//         city: req.body.PersonalDetails.city,
//         age:req.body.PersonalDetails.age,
//         Gender:req.body.PersonalDetails.Gender,
//         contactNo: req.body.PersonalDetails.contactNo,
//         country: req.body.PersonalDetails.country,
//         email: req.body.PersonalDetails.email,
//         firstName: req.body.PersonalDetails.firstName,
//         lastName: req.body.PersonalDetails.lastName,
//         pincode: req.body.PersonalDetails.pincode,
//         state: req.body.PersonalDetails.state,
//         activities: req.body.EdDetails.activities,
//         description: req.body.EdDetails.description,
//         endDate: req.body.EdDetails.endDate,
//         fieldOfStudy: req.body.EdDetails.fieldOfStudy,
//         grade: req.body.EdDetails.grade,
//         highestDegree: req.body.EdDetails.highestDegree,
//         school: req.body.EdDetails.school,
//         startDate: req.body.EdDetails.startDate,
//         skillsTextarea:req.body.EdDetails.skillsTextarea
//     })
//   try {
//     doc = await newStudent.save();
//     return res.status(201).json(doc);
//   }
//   catch (err) {
//     return res.status(501).json(err);
//   }
// });
app.get('/adminStudent/:id',async function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.params.id)
    const id = req.params.id;
    await AdminStudentData.findOne({_id:id})
    .then(function(student){
        console.log(student);
        if (student==null) {
            return Promise.reject('Student not found');
        }
        res.send(student);
    })
    .catch(err=>{res.send(err);})
});
app.put('/adminStudent/:id', async function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;

if (req.fields.ImageUpload != 'undefined' && req.fields.FileUpload == 'undefined' ){
    var files = [];
    var fileKeys = Object.keys(req.files);
    fileKeys.forEach(function(key) {
        files.push(req.files[key]);
    });
    let studentToEdit= await AdminStudentData.findById(req.params.id);
    await cloudinary.uploader.destroy(studentToEdit.img_cloudinary_id);
    const result1 = await cloudinary.uploader.upload(files[0].path);

    var addLine1= req.fields.addLine1;
    var addLine2= req.fields.addLine2;
    var city= req.fields.city;
    var age=req.fields.age;
    var Gender=req.fields.Gender;
    var contactNo= req.fields.contactNo;
    var country= req.fields.country;
    var email= req.fields.email;
    var firstName= req.fields.firstName;
    var lastName=req.fields.lastName;
    var pincode= req.fields.pincode;
    var state= req.fields.state;
    var activities= req.fields.activities;
    var description= req.fields.description;
    var endDate= req.fields.endDate;
    var fieldOfStudy= req.fields.fieldOfStudy;
    var grade= req.fields.grade;
    var highestDegree= req.fields.highestDegree;
    var school= req.fields.school;
    var startDate= req.fields.startDate;
    var skillsTextarea=req.fields.skillsTextarea;
    var logoInput= result1.secure_url;
    var img_cloudinary_id=result1.public_id;

        await AdminStudentData.findOneAndUpdate({_id:id},{$set:{
            addLine1,
            addLine2,
            city,
            age,
            Gender,
            contactNo,
            country,
            email,
            firstName,
            lastName,
            pincode,
            state,
            activities,
            description,
            endDate,
            fieldOfStudy,
            grade,
            highestDegree,
            school,
            startDate,
            skillsTextarea,
            logoInput,
            img_cloudinary_id

        }},{new:true})
        .then (function(updatedStudent){
            console.log("upadytedStudent")
            console.log(updatedStudent);
            res.send(updatedStudent);
        })
} 
else if (req.fields.FileUpload != 'undefined' && req.fields.ImageUpload == 'undefined' ){
    var files = [];
    var fileKeys = Object.keys(req.files);
    fileKeys.forEach(function(key) {
        files.push(req.files[key]);
    });
    let studentToEdit= await AdminStudentData.findById(req.params.id);
    await cloudinary.uploader.destroy(studentToEdit.res_cloudinary_id);
    const result2 = await cloudinary.uploader.upload(files[0].path);

    var addLine1= req.fields.addLine1;
    var addLine2= req.fields.addLine2;
    var city= req.fields.city;
    var age=req.fields.age;
    var Gender=req.fields.Gender;
    var contactNo= req.fields.contactNo;
    var country= req.fields.country;
    var email= req.fields.email;
    var firstName= req.fields.firstName;
    var lastName=req.fields.lastName;
    var pincode= req.fields.pincode;
    var state= req.fields.state;
    var activities= req.fields.activities;
    var description= req.fields.description;
    var endDate= req.fields.endDate;
    var fieldOfStudy= req.fields.fieldOfStudy;
    var grade= req.fields.grade;
    var highestDegree= req.fields.highestDegree;
    var school= req.fields.school;
    var startDate= req.fields.startDate;
    var skillsTextarea=req.fields.skillsTextarea;
    var resumeInput= result2.secure_url;
    var res_cloudinary_id=result2.public_id;

        await AdminStudentData.findOneAndUpdate({_id:id},{$set:{
            addLine1,
            addLine2,
            city,
            age,
            Gender,
            contactNo,
            country,
            email,
            firstName,
            lastName,
            pincode,
            state,
            activities,
            description,
            endDate,
            fieldOfStudy,
            grade,
            highestDegree,
            school,
            startDate,
            skillsTextarea,
            resumeInput,
            res_cloudinary_id

        }},{new:true})
        .then (function(updatedStudent){
            console.log("upadytedStudent")
            console.log(updatedStudent);
            res.send(updatedStudent);
        })
}
else if(req.fields.ImageUpload != 'undefined' && req.fields.FileUpload != 'undefined'){
    var files = [];
var fileKeys = Object.keys(req.files);
fileKeys.forEach(function(key) {
    files.push(req.files[key]);
});

    let studentToEdit= await AdminStudentData.findById(req.params.id);
    await cloudinary.uploader.destroy(studentToEdit.res_cloudinary_id);
    await cloudinary.uploader.destroy(studentToEdit.img_cloudinary_id);
    const result1 = await cloudinary.uploader.upload(files[0].path);
    const result2 = await cloudinary.uploader.upload(files[1].path);

    var addLine1= req.fields.addLine1;
    var addLine2= req.fields.addLine2;
    var city= req.fields.city;
    var age=req.fields.age;
    var Gender=req.fields.Gender;
    var contactNo= req.fields.contactNo;
    var country= req.fields.country;
    var email= req.fields.email;
    var firstName= req.fields.firstName;
    var lastName=req.fields.lastName;
    var pincode= req.fields.pincode;
    var state= req.fields.state;
    var activities= req.fields.activities;
    var description= req.fields.description;
    var endDate= req.fields.endDate;
    var fieldOfStudy= req.fields.fieldOfStudy;
    var grade= req.fields.grade;
    var highestDegree= req.fields.highestDegree;
    var school= req.fields.school;
    var startDate= req.fields.startDate;
    var skillsTextarea=req.fields.skillsTextarea;
    var logoInput= result1.secure_url;
    var img_cloudinary_id=result1.public_id;
    var resumeInput= result2.secure_url;
    var res_cloudinary_id=result2.public_id;

        await AdminStudentData.findOneAndUpdate({_id:id},{$set:{
            addLine1,
            addLine2,
            city,
            age,
            Gender,
            contactNo,
            country,
            email,
            firstName,
            lastName,
            pincode,
            state,
            activities,
            description,
            endDate,
            fieldOfStudy,
            grade,
            highestDegree,
            school,
            startDate,
            skillsTextarea,
            logoInput,
            img_cloudinary_id,
            resumeInput,
            res_cloudinary_id

        }},{new:true})
        .then (function(updatedStudent){
            console.log("upadytedStudent")
            console.log(updatedStudent);
            res.send(updatedStudent);
        })
   
}
else{
    let studentToEdit= await AdminStudentData.findById(req.params.id);

    var addLine1= req.fields.addLine1;
    var addLine2= req.fields.addLine2;
    var city= req.fields.city;
    var age=req.fields.age;
    var Gender=req.fields.Gender;
    var contactNo= req.fields.contactNo;
    var country= req.fields.country;
    var email= req.fields.email;
    var firstName= req.fields.firstName;
    var lastName=req.fields.lastName;
    var pincode= req.fields.pincode;
    var state= req.fields.state;
    var activities= req.fields.activities;
    var description= req.fields.description;
    var endDate= req.fields.endDate;
    var fieldOfStudy= req.fields.fieldOfStudy;
    var grade= req.fields.grade;
    var highestDegree= req.fields.highestDegree;
    var school= req.fields.school;
    var startDate= req.fields.startDate;
    var skillsTextarea=req.fields.skillsTextarea;

        await AdminStudentData.findOneAndUpdate({_id:id},{$set:{
            addLine1,
            addLine2,
            city,
            age,
            Gender,
            contactNo,
            country,
            email,
            firstName,
            lastName,
            pincode,
            state,
            activities,
            description,
            endDate,
            fieldOfStudy,
            grade,
            highestDegree,
            school,
            startDate,
            skillsTextarea
        }},{new:true})
        .then (function(updatedStudent){
            res.send(updatedStudent);
            console.log("upadytedStudent")
            console.log(updatedStudent);
        })
}  

})
app.delete('/adminStudent/:id', async function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.params.id)
    const id = req.params.id;
    await AdminStudentData.deleteOne({_id:id})
    .then(function(err){
        console.log(err);
    })
})
app.post('/adminStudent/AddDetails/', async function(req,res){

var files = [];
var fileKeys = Object.keys(req.files);
fileKeys.forEach(function(key) {
    files.push(req.files[key]);
});
try {
    const result1 = await cloudinary.uploader.upload(files[0].path);
    console.log(result1);
    const result2 = await cloudinary.uploader.upload(files[1].path);
    console.log(result2);
    var newStudent = new AdminStudentData({
        addLine1: req.fields.addLine1,
        addLine2: req.fields.addLine2,
        city: req.fields.city,
        age:req.fields.age,
        Gender:req.fields.Gender,
        contactNo: req.fields.contactNo,
        country: req.fields.country,
        email: req.fields.email,
        firstName: req.fields.firstName,
        lastName: req.fields.lastName,
        pincode: req.fields.pincode,
        state: req.fields.state,
        activities: req.fields.activities,
        description: req.fields.description,
        endDate: req.fields.endDate,
        fieldOfStudy: req.fields.fieldOfStudy,
        grade: req.fields.grade,
        highestDegree: req.fields.highestDegree,
        school: req.fields.school,
        startDate: req.fields.startDate,
        skillsTextarea:req.fields.skillsTextarea,
        logoInput: result1.secure_url,
        img_cloudinary_id:result1.public_id,
        resumeInput:result2.secure_url,
        res_cloudinary_id:result2.public_id
    })
    console.log(newStudent)
    doc = await newStudent.save();
    return res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }

})
  
app.listen(PORT,()=>{console.log('Server at 3000')});