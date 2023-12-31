const express=require('express');
const app=express();
require('dotenv').config();

const cors=require('cors');
app.use(
    cors({origin:true})
)

app.use(express.json());
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT,()=>{
    
    console.log('Backend is running at port',process.env.PORT);
})

const {databaseConnect}=require('./config/database');
databaseConnect();

const authroutes=require('./routes/auth');
const userroutes=require('./routes/users');
const postroutes=require('./routes/posts');
const categoryroutes=require('./routes/categories')
app.use('/api/posts',postroutes);
app.use('/api/auth',authroutes);
app.use('/api/user',userroutes);
app.use('/api/categories',categoryroutes);

const date=Date.now();
const path=require('path');
const multer=require('multer');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
});
app.use('/images',express.static(path.join(__dirname,"/images")));

const upload=multer({storage:storage});

app.post('/api/upload',upload.single('file'),(req,res)=>{
    res.status(200).json('File has been uploaded')
})


