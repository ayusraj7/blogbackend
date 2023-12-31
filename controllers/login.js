
const User=require('../models/User');
const bcrypt=require('bcrypt');

exports.login=async(req,res)=>{
    try{
        
        const{email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user)
        {
            return res.status(400).json('Wrong Credentials');
        }
       
        
        const validate=await bcrypt.compare(password,user.password);
        
        if(!validate) 
        {
          return res.status(404).json('wrong password,please fill the correct password');
        }
        
         
        res.status(200).json(user);
        



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