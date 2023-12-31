const Category=require('../models/Category');

exports.createCat=async(req,res)=>{
    const newCat = new Category(req.body);
    try{
        const savedCat=await newCat.save();
        res.status(200).json(savedCat);
    }catch(err)
    {
        res.status(500).json({
            err:err
        })
    }
}

exports.allCat=async(req,res)=>{
    try{
        const cats=await Category.find({});
        res.status(200).json(cats);
    }catch(error)
    {
        console.log('error',error);
        res.status(500).json('internal server error')
    }
}