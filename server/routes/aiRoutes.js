import express from "express";
import {
    backgroundImage,
  generateArticle,
  generateBlog,
  generateImage,
  removeImageObject,
  resumeReview,
} from "../controllers/aiController.js";
import { auth } from "../middlewares/auth.js";
import { upload } from "../config/multer.js";

export const Airouter = express.Router();

Airouter.post("/generate-article", auth, generateArticle);
Airouter.post("/generate-blog", auth, generateBlog);
Airouter.post("/generate-image", auth, generateImage);
Airouter.post("/remove-background-image", auth, upload.single("image") , backgroundImage);
Airouter.post("/remove-image-object", auth,upload.single("image"), removeImageObject);
Airouter.post("/generate-image", auth, generateImage);Airouter.post("/review-resume", auth, upload.single("resume"), resumeReview);
