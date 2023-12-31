const router=require('express').Router();

const {updatepp,deleteuser,getUser}=require('../controllers/updatepp');
//update
router.put('/:id',updatepp);
router.delete('/:id',deleteuser);
router.get('/:id',getUser);
module.exports=router;