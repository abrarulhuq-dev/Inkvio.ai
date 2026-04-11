import multer from "multer";

const storage = multer.diskStorage({});

export const upload = multer({ storage });




const PDFUpload = multer({
  storage: multer.memoryStorage(), // ✅ important
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export default PDFUpload;