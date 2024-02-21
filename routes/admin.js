const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } =require("../db/index");
const { Course } = require("../db/index");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    Admin.findOne({
        username,
        password
    }).then((val)=>{
        if(val){
            res.json({msg:"Admin already exist"})
        }else{
            Admin.create({
                username:username,
                password:password
            }).then(()=>{
                res.json({
                    message: 'Admin created successfully'
                })
            })
        }
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const description=req.body.description;
    const imageLink=req.body.imageLink;
    const price=req.body.price;
    //validation is not done here but it's imp to do that
    const entry = await Course.create({
        title,
        description,
        price,
        imageLink
    })
    res.json({
        message: 'Course created successfully', courseId: entry._id
    })
});

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    const response=await Course.find({});
    res.json({response});
});

module.exports = router;