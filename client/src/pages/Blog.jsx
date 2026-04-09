import { Edit, Hash, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { blogsAPI } from "../services/api";
import Markdown from "react-markdown";

const Blog = () => {
  const blogCategory = [
    "General",
    "Technology",
    "Busniess",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [Selectcategory, setSelectcategory] = useState("General");
  const [topic, settopic] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [content, setcontent] = useState("");

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    // handle form submission logic here

    try {
      setloading(true);
      const prompt = `Generate Blog titles on the topic 
Topic: "AI"
Category: "Education"

STRICT OUTPUT RULES:
- Output ONLY a numbered list (1–5)
- Do NOT write introductions
- Do NOT say "Here are"
- Do NOT add explanations
- Do NOT use markdown
- Each title must be under 60 characters
`;

      const data = await blogsAPI.GenBlog({
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
        "An error occurred while generating the article. Please try again.",
      );
      seterror(
        "An error occurred while generating the article. Please try again.",
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
          <h1 className="text-lg font-semibold">AI Title Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Keyword</p>
        <input
          type="text"
          placeholder="The future of artificial intelligence"
          className="w-full p-2 px-3 mt-3 border border-gray-300 outline-none textsm rounded-md "
          onChange={(e) => settopic(e.target.value)}
          value={topic}
          required
        />

        <p className="mt-4 text-sm font-medium">Category</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {blogCategory.map((item, idx) => (
            <span
              onClick={() => setSelectcategory(item)}
              key={idx}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                Selectcategory === item
                  ? " bg-purple-50 text-purple-700"
                  : "text-gray-500 border-gray-300"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <br />

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#1A1A40] to-[#9234EA] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Hash className="w-5" />
          )}
          Generate title
        </button>
      </form>

      {/* right column */}
      <div className="w-full max-w-2xl p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Edit className="w-6 text-[#9234EA]" />
          <h1 className="text-lg font-semibold">Generated titles</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          {/* Generated article content will go here */}
          {!content ? (
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Hash className="w-10 h-10" />
              <p>Enter keywords and click "Generate Titles" to get started</p>
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll sidepanel-scrollbar text-sm text-slate-600">
              <div className="reset-tw">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
