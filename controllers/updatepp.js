const User=require('../models/User');
const bcrypt=require('bcrypt');
const Post=require('../models/Post')

exports.updatepp=async(req,res)=>{
        const {userId}=req.body;
        if(userId===req.params.id)
        {
            if(req.body.password)
            {
                const salt=await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);

            }
            try{
                
                const updatedUser =await User.findByIdAndUpdate(
                    userId,
                    {$set:req.body},
                    {new:true}
                );
                res.status(200).json({
                    updatedUser
                })
            }catch(error)
            {
                res.status(500).json(err);
            }
        }else 
        {
            res.status(401).json("you can update only your account !");
        }
}

//DELETE 
exports.deleteuser=async(req,res)=>{
    const {userId}=req.body;
    if(userId===req.params.id)
    { 
        const user=await User.findById(req.params.id);
        try{
             await Post.deleteMany({username:user.username})
             await User.findByIdAndDelete(
                userId,
                {new:true}
            );
            res.status(200).json('deleted successfully');
        }catch(error)
        {
            res.status(500).json(err);
        }
    }else 
    {
        res.status(401).json("you can delete only your account !");
    }
}

//get user 
exports.getUser=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        console.log('user_doc',user._doc);
        const{password,...others}=user._doc;
        res.status(200).json(others);
    }catch(err)
    {
        res.status(200).json({
            err
        })
    }
}