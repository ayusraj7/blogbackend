const router=require('express').Router();

const{register}=require('../controllers/register');
const {login}=require('../controllers/login')

//REGISTER 
router.post('/register',register);
//LOGIN
router.post('/login',login);

module.exports=router;
