import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkClient, clerkMiddleware, requireAuth } from "@clerk/express";
import { Airouter } from "./routes/aiRoutes.js";
import ConnectCloudinary from "./config/cloudinary.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use(clerkMiddleware());

await ConnectCloudinary();



app.get("/", (req, res) => {
  res.send("Server is running");
});

// app.use(requireAuth());
app.use("/api/ai", Airouter);

// ✅ Test Clerk auth
// app.get("/test-auth",async (req, res) => {
//     const { userId, has } = await req.auth();
    
//     // chnage plan name based on our plan name
//     const hasprostudioplan = await has({ plan: "prostudio" });
//     const hascreatorplan = await has({ plan: "creator" });
//     const hasstarterplan = await has({ plan: "starter" });
//     const user = await clerkClient.users.getUser(userId);

    
//     console.log("User:", user);
//     console.log("metadata:", user.privateMetadata);
//     console.log("Free Usage:", user.privateMetadata.free_usage);
//     console.log("Has Starter Plan:", hasstarterplan);
//     console.log("Has Pro Studio Plan:", hasprostudioplan);
//     console.log("Has Creator Plan:", hascreatorplan);


//   res.json({
//     message: "Clerk authentication successful 🎉",
//     userId,
//     sessionId: req.auth.sessionId,
//   });
// });



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
