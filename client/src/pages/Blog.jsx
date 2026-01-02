import { Edit, Hash, Sparkles } from "lucide-react";
import React, { useState } from "react";

const Blog = () => {
  const blogCategory = ["General", 'Technology', 'Busniess', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food'];

  const [Selectcategory, setSelectcategory] = useState('General');
  const [topic, settopic] = useState("");

  const OnSubmitHandler = (e) => {
    e.preventDefault();
    // handle form submission logic here
  };

  return (
    <div className="h-full overflow-y-scroll sidepanel-scrollbar p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* left column */}

      <form
        onSubmit={OnSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#8e37eb]" />
          <h1 className="text-lg font-semibold">AI Title Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Keyword</p>
        <input
          type="text"
          placeholder="Enter your article topic..."
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

        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#c341f6] to-[#8e37eb] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
          <Hash className="w-5" />
          Generate title
        </button>
      </form>

      {/* right column */}
      <div className="w-full max-w-2xl p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Edit className="w-6 text-[#8e37eb]" />
          <h1 className="text-lg font-semibold">Generated titles</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          {/* Generated article content will go here */}
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Edit className="w-6 h-9" />
            <p>Enter a Topic and click "Generate Title" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
