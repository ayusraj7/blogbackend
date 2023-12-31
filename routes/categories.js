const router=require('express').Router();

const {createCat, allCat}= require('../controllers/category');
router.post('/',createCat);
router.get('/',allCat)
module.exports=router;