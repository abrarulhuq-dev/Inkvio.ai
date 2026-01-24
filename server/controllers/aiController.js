import OpenAI from "openai";
import db from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { PDFParse } from "pdf-parse";

const AI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateArticle = async (req, res) => {
  try {
    const userId = req.userId;
    const plan = req.plan;
    const free_usage = req.free_usage;
    const { prompt, length } = req.body;

    if (plan !== "prostudio" && plan !== "creator" && free_usage >= 5) {
      return res.status(403).json({
        message: "Free usage limit exceeded. Please upgrade your plan.",
      });
    }
    const tokenLimit = Math.ceil(length * 1.5);

    const response = await AI.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: tokenLimit,
    });

    const content = response.choices[0].message.content;

    await db` INSERT INTO public.creations (user_id, prompt, content, type) values (${userId}, ${prompt}, ${content}, 'article') `;

    if (plan !== "prostudio" && plan !== "creator") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.status(200).json({
      success: true,
      message: "Article generated successfully",
      data: content,
    });
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const generateBlog = async (req, res) => {
  try {
    const userId = req.userId;
    const plan = req.plan;
    const free_usage = req.free_usage;
    const { prompt } = req.body;

    if (plan !== "prostudio" && plan !== "creator" && free_usage >= 15) {
      return res.status(403).json({
        message: "Free usage limit exceeded. Please upgrade your plan.",
      });
    }
    const response = await AI.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    console.log(response.choices[0]);

    const content = response.choices[0].message.content;

    await db` INSERT INTO public.creations (user_id, prompt, content, type) values (${userId}, ${prompt}, ${content}, 'blog-title') `;

    if (plan !== "prostudio" && plan !== "creator") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog generated successfully",
      data: content,
    });
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const generateImage = async (req, res) => {
  try {
    const userId = req.userId;
    const plan = req.plan;
    // const free_usage = req.free_usage;
    const { prompt, publish } = req.body;

    // later work on free usage for image generation

    if (plan !== "prostudio" && plan !== "creator") {
      return res.status(403).json({
        message:
          "Image generation is available for Pro Studio and Creator plans only.",
      });
    }

    // if (plan !== "prostudio" && plan !== "creator" && free_usage >= 15) {
    //   return res.status(403).json({
    //     message: "Free usage limit exceeded. Please upgrade your plan.",
    //   });
    // }

    const form = new FormData();
    form.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      },
    );
    const imageBase64 = `data:image/png;base64,${Buffer.from(
      data,
      "binary",
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(imageBase64);

    await db` INSERT INTO public.creations (user_id, prompt, content, type, publish) values (${userId}, ${prompt}, ${secure_url}, 'image', ${
      publish ?? false
    }) `;

    // if (plan !== "prostudio" && plan !== "creator") {
    //   await clerkClient.users.updateUserMetadata(userId, {
    //     privateMetadata: { free_usage: free_usage + 1 },
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "Image generated successfully",
      data: secure_url,
    });
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const backgroundImage = async (req, res) => {
  try {
    const userId = req.userId;
    const plan = req.plan;
    // const free_usage = req.free_usage;
    const { image } = req.file;

    // later work on free usage for image generation
    if (plan !== "prostudio" && plan !== "creator") {
      return res.status(403).json({
        message:
          "Image generation is available for Pro Studio and Creator plans only.",
      });
    }

    // if (plan !== "prostudio" && plan !== "creator" && free_usage >= 15) {
    //   return res.status(403).json({
    //     message: "Free usage limit exceeded. Please upgrade your plan.",
    //   });
    // }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await db` INSERT INTO public.creations (user_id, prompt, content, type) values (${userId}, 'Remove background from image', ${secure_url}, 'background-remover'}) `;

    // if (plan !== "prostudio" && plan !== "creator") {
    //   await clerkClient.users.updateUserMetadata(userId, {
    //     privateMetadata: { free_usage: free_usage + 1 },
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "Image generated successfully",
      data: secure_url,
    });
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const userId = req.userId;
    const plan = req.plan;
    // const free_usage = req.free_usage;
    const { object } = req.body;
    const { image } = req.file;

    // later work on free usage for image generation
    if (plan !== "prostudio" && plan !== "creator") {
      return res.status(403).json({
        message:
          "Image generation is available for Pro Studio and Creator plans only.",
      });
    }

    // if (plan !== "prostudio" && plan !== "creator" && free_usage >= 15) {
    //   return res.status(403).json({
    //     message: "Free usage limit exceeded. Please upgrade your plan.",
    //   });
    // }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageurl = cloudinary.url(public_id, {
      transformation: [
        {
          effect: `gen_remove:${object}`,
        },
      ],
      resource_type: "image",
    });

    await db` INSERT INTO public.creations (user_id, prompt, content, type) values (${userId}, ${`remove ${object} from image`}, ${imageurl}, 'oject-remover'}) `;

    // if (plan !== "prostudio" && plan !== "creator") {
    //   await clerkClient.users.updateUserMetadata(userId, {
    //     privateMetadata: { free_usage: free_usage + 1 },
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "Image generated successfully",
      data: imageurl,
    });
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const userId = req.userId;
    const plan = req.plan;
    const free_usage = req.free_usage;
    const resume = req.file;

    if (plan !== "prostudio" && plan !== "creator") {
      return res.status(403).json({
        message:
          "Resume review is available for Pro Studio and Creator plans only.",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        message: "File size exceeds 5MB limit.",
      });
    }

    const databuffer = fs.readFileSync(resume.path);

    const uintt8array = new Uint8Array(databuffer);

    const pdfdata = new PDFParse(uintt8array);

    const data = await pdfdata.getText();

    const prompt = `Review my resume and suggest improvements, highlighting areas for improvement. Here is the content:\n\n ${pdfdata.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    await db` INSERT INTO public.creations (user_id, prompt, content, type) values (${userId}, "Review my resume and suggest improvements, highlighting areas for improvement", ${content}, 'resume-review') `;

    res.status(200).json({
      success: true,
      message: "Blog generated successfully",
      data: pdfdata.text,
    });
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
