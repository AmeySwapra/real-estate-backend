import express from 'express';
import { addPost, updatePost, deletePost, getAllPosts, getPostById } from '../controllers/post.controller.js';
import { verifyToken } from '../middleware/verfiyToken.js';

const router = express.Router();


router.post('/',verifyToken, addPost);


router.put('/:id', updatePost);


router.delete('/:id', deletePost);


router.get('/', getAllPosts);


router.get('/:id', getPostById);

export default router;
