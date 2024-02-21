const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb+srv://rishidubey210502:XiyzJIibhQUbNi5A@cluster0.xuqyxwx.mongodb.net/My_project_db");

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String,
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
});

const CourseSchema=new mongoose.Schema({
    title:String,
    description:String,
    imageLink:String,
    price:Number,
})





const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}