const User=require('../models/User');
const bcrypt=require('bcrypt');
const Post=require('../models/Post')

//create post
exports.createPost=async(req,res)=>{
       try{
           const newPost=new Post(req.body);
          
           const savedPost=await newPost.save();
           
           res.status(200).json(savedPost);
       }catch(error){
           console.log('error',error);
           res.status(500).json({
               message:'internal server error'
           })
       }
}

//update post 
exports.updatePost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.username === req.body.username)
        {
        try{
            const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },
            {new:true}
            )
            res.status(200).json({
                updatedPost
            })
        }catch(error){
            res.status(500).json({
                message:'internal server error'
            })
        }
      }else 
     {
        res.status(401).json("You can update only your post!");
     }

    }catch(error)
    {
        res.status(500).json({
            message:'internal server error'
        })
    }
}

//delete post 
exports.deletePost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        console.log('post username',post.username,'username',req.body.username);
        if(post.username === req.body.username)
        {
        try{
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json('Post has been deleted... ');
            console.log('post is deleted');
        }catch(error){
            console.log('error',error);
            res.status(500).json({
                message:'internal server error'
            })
        }
      }else 
      {
        res.status(401).json("You can delete only your post!");
      }
    }catch(error){
        console.log('error',error);
        res.status(500).json({
            message:'internal server error'
        })
    }
}


//get post 
exports.getPost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(error)
    {
        console.log('error',error);
        res.status(500).json('internal server error');
    }
}


//all posts 
exports.getAllPosts=async(req,res)=>{
    const username=req.query.user;
    const catName=req.query.cat;
    try{
        let posts;
        if(username){
            posts=await Post.find({username});
        }else if(catName){
            posts=await Post.find({categories:{
                $in:[catName]
            }})
        }else 
        {
            posts=await Post.find({});
        }

        res.status(200).json(posts);


    }catch(error)
    {
        res.status(500).json({
            message:'internal server error'
        });
    }
}