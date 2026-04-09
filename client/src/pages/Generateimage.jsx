import { Edit, Image, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { imagesAPI } from "../services/api";
import toast from "react-hot-toast";

const Generateimage = () => {
  const imagestyle = [
    "Realistic",
    "Cartoon style",
    "Ghibli style",
    "Anime style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "portrait style",
  ];

  const [selectedStyle, setselectedStyle] = useState("Realistic");
  const [topic, settopic] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [content, setcontent] = useState("");

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    // handle form submission logic here
    try {
      setloading(true);

      const prompt = `Generate an image based on the following description:
Description: "${topic}"
Style: "${selectedStyle}"`;

      const data = await imagesAPI.GenImage({
        prompt,
      });

      if (data.success) {
        setcontent(data.data);
      } else {
        seterror(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "An error occurred while generating the image. Please try again.",
      );
      seterror(
        "An error occurred while generating the image. Please try again.",
      );
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="h-full overflow-y-scroll sidepanel-scrollbar p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* left column */}

      <form
        onSubmit={OnSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#9234EA]" />
          <h1 className="text-lg font-semibold">AI Image Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Describe Your Image</p>
        <textarea
          rows={4}
          placeholder="Describe what you want to see in the image.."
          className="w-full p-2 px-3 mt-3 border border-gray-300 outline-none textsm rounded-md "
          onChange={(e) => settopic(e.target.value)}
          value={topic}
          required
        />

        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {imagestyle.map((item, idx) => (
            <span
              onClick={() => setselectedStyle(item)}
              key={idx}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedStyle === item
                  ? " bg-purple-50 text-purple-700"
                  : "text-gray-500 border-gray-300"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className="text-sm ">Make This Image Public</p>
        </div>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#1A1A40] to-[#9234EA] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Image className="w-5" />
          )}
          Generate Image
        </button>
      </form>

      {/* right column */}
      <div className="w-full max-w-2xl p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Image className="w-6 text-[#9234EA]" />
          <h1 className="text-lg font-semibold">Generated image</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          {/* Generated article content will go here */}
          {content ? (
            <div className="w-full mt-2 flex justify-center items-center">
              <img
                src={content}
                alt="Generated image"
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Image className="w-10 h-10" />
              <p>Describe an image and click "Generate Image" to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generateimage;
