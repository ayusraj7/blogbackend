const mongoose=require('mongoose');

exports.databaseConnect=()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            
            
        }).then(console.log('successful'))
          .catch((error)=>console.log('error',error));
    }catch(error)
    {
        console.log('error in data base  connectivity',error);
    }
}