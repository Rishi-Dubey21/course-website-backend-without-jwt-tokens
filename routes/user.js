const { Router } = require("express");
const router = Router();
const { User,Course } = require("../db/index");
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const username=req.body.username;
    const password=req.body.password;
    const response = await User.findOne({
        username,
        password
    })
    if(response){
        res.json({
            msg:"User already there"
        })
    }else{
        User.create({
            username,
            password
        })
        res.json({ message: 'User created successfully' })
    }
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({})
    .then((response)=>{
        res.json({response});
    })
});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    const id=req.params.courseId;
    const username=req.headers.username;
    const password=req.headers.password;
    await User.updateOne({
        username,
        password
    },{
        "$push":{
            purchasedCourses:id
        }
    })
    res.json({msg:"Purchased successfully"});
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic
    const curr_user=await User.findOne({
        username:req.headers.username,
        password:req.headers.password
    })
    const val=await Course.find({
        _id:{
            "$in":curr_user.purchasedCourses
        }
    })
    res.json({val})
});

module.exports = router