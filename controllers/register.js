const User=require('../models/User');
const bcrypt=require('bcrypt');
exports.register=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        
        const hashedpassword=await bcrypt.hash(password,6);
         console.log('password',hashedpassword);
        
        const newuser=await User.create({
            username,
            email,
            password:hashedpassword,
            profilePic:`https://api.dicebear.com/5.x/initials/svg?seed=${username}`

        })

        console.log('user',newuser);
        
        res.status(200).json({
            success:true,
            data:newuser
        })
    }catch(error)
    {
        console.log('error',error);
        res.status(500).json({
            message:'internal server error',
            success:false,
            error:error
        })
    }
}


