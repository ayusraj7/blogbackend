const router=require('express').Router();

const {createPost,updatePost,deletePost,getPost,getAllPosts}=require('../controllers/post');
//update
router.post('/',createPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);
router.get('/:id',getPost);
router.get('/',getAllPosts);
module.exports=router;