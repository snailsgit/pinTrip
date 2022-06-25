const router=require('express').Router();
const User=require('../models/User');
const bcrypt=require('bcrypt');


//create a new user
router.post("/register",async(req,res)=>{

    try{

        //generate new password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);

        //create new user
        const newUser= new User({
            user:req.body.user,
            email:req.body.email,
            password:hashedPassword,
        });
        //save user and save response

        const user = newUser.save();
        res.status(200).json(user._id);
    }
    catch(err){

        res.status(500).json(err.message);
    }
});

//get all user

router.post("/login", async(req,res)=>{
    try {
        //findUser
        const user = await User.findOne({user:req.body.user});
        if(!user){
            res.status(404).json("Wrong username or password");
            return;
        }
        //validate Password
        const validatePassword=await bcrypt.compare(req.body.password,user.password);
        if(!validatePassword){
            res.status(404).json("Wrong username or password");
            return;
        }
        //send response
        res.status(200).json({_id:user._id,username:user.user});
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports=router;