import express from 'express'
import { getpublicCreations, getuserCreations, likeCreation } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';

export const userRouter = express.Router();

userRouter.get('/creations',auth, getuserCreations);
userRouter.get('/public-creations',auth, getpublicCreations);
userRouter.post('/like-creation/:id',auth, likeCreation);