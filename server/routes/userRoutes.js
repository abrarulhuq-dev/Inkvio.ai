import express from 'express'
import { getpublicCreations, getuserCreations, likeCreation } from '../controllers/userController.js';

export const userRouter = express.Router();

userRouter.get('/creations', getuserCreations);
userRouter.get('/public-creations', getpublicCreations);
userRouter.post('/like-creation/:id', likeCreation);