import db from "../config/db.js";

export const getuserCreations = async (req, res) => {
  try {
    const userId = req.userId;

    const data =
      await db`SELECT * FROM  public.creations WHERE user_id = ${userId} ORDER BY created_at DESC `;

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("Get User Creations Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getpublicCreations = async (req, res) => {
  try {
    const data =
      await db`SELECT * FROM  public.creations WHERE is_public = true ORDER BY created_at DESC `;

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("Get User Creations Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const likeCreation = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const [creations] = await db`SELECT * FROM public.creations WHERE id = ${id}`;

    if (!creations) {
      return res.status(404).json({ message: "Creation not found" });
    }

    const currentlike = creations.likes
    const userIdStr = userId.toString()
    let updatedLikes;
    let message;

    if (currentlike.includes(userIdStr)){
      updatedLikes = currentlike.filter((like) => like !== userIdStr);
      message = "Like removed successfully";
    }
    else {
      updatedLikes = [...currentlike, userIdStr];
      message = "Like added successfully";
    }

    const formattedArray = `{${updatedLikes.json(',')}`;

    await db` UPDATE public.creations SET likes = ${formattedArray} WHERE id = ${id} RETURNING * `;
   

    res.status(200).json({ success: true, message });
  } catch (error) {
    console.log("Like Creation Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
