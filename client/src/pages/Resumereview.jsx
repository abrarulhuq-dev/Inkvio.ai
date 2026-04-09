import { FileText, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { resumeAPI } from "../services/api";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

const Resumereview = () => {
  const [topic, settopic] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [content, setcontent] = useState("");

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    // handle form submission logic here
    try {
      setloading(true);
      const fromData = new FormData();
      fromData.append("resume", topic);
      const data = await resumeAPI.ReviewResume(fromData);
      if (data.success) {
        setcontent(data.data);
      } else {
        seterror(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "An error occurred while processing the resume. Please try again.",
      );
      seterror(
        "An error occurred while processing the resume. Please try again.",
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
          <h1 className="text-lg font-semibold">Resume Review</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Resume</p>
        <input
          type="file"
          className="w-full p-2 px-3 mt-3 border border-gray-300 outline-none textsm rounded-md text-gray-600 "
          onChange={(e) => settopic(e.target.files[0])}
          accept="application/pdf"
          required
        />
        <p className="text-xs text-gray-500 font-light mt-1">
          Supports PDF resume only.
        </p>

        {/* <p className="mt-4 text-sm font-medium">Category</p>
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
        </div> */}

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#1A1A40] to-[#9234EA] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <FileText className="w-5" />
          )}
          Review Resume
        </button>
      </form>

      {/* right column */}
      <div className="w-full max-w-2xl p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <FileText className="w-6 text-[#9234EA]" />
          <h1 className="text-lg font-semibold">Analysis Results</h1>
        </div>
        {/* Generated article content will go here */}
        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <FileText className="w-10 h-10" />
              <p>Upload your resume and click "Review Resume" to get started</p>
            </div>
          </div>
        ) : (
          <div className=" text-sm text-slate-600 mt-3 overflow-auto sidepanel-scrollbar">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resumereview;
