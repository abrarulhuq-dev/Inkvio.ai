// MIddle to check user id  and haspremium plans

import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const { userId, has } = await req.auth();

    // chnage plan name based on our plan name
    const hasprostudioplan = await has({ plan: "prostudio" });
    const hascreatorplan = await has({ plan: "creator" });
    

    const user = await clerkClient.users.getUser(userId);

    if (!hasprostudioplan && !hascreatorplan && user.privateMetadata.free_usage) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      await clerkClient.users.updateUser(userId, {
        privateMetadata: { free_usage: 0 },
      });
        req.free_usage = 0;
    }
    
    req.userId = userId;
    req.plan = hasprostudioplan ? "prostudio" : hascreatorplan ? "creator" : "starter";

    next();
    
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
