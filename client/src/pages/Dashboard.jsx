import React, { useEffect, useState } from "react";
import { dummyCreationData } from "../assets/assets";
import { Gem, Sparkles } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../component/CreationItem";
import { userAPI } from "../services/api";

const Dashboard = () => {
  const [creations, setcreations] = useState([]);
  const [loading, setLoading] = useState(false);
  const getDashboardData = async () => {
    try {
      setLoading(true);
      const res = await userAPI.GetCreations();
      setcreations(res.data);
    } catch (error) {
      console.log("Dashboard Data Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll sidepanel-scrollbar p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h1 className="text-xl font-semibold">{creations.length}</h1>
          </div>
          <div className="size-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white " />
          </div>
        </div>

        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h1 className="text-xl font-semibold">
              {/* plan display */}
              <Protect
                condition={(has) =>
                  has({ plan: "creator" }) || has({ plan: "prostudio" })
                }
                fallback="Upgrade"
              >
                Premium
              </Protect>
            </h1>
          </div>
          <div className="size-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
            <Gem className="w-5 text-white " />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <p className="mt-6 mb-4">Recent Creations</p>
        {loading ? (
          <p className="text-center mt-10">Loading...</p>
        ) : creations.length === 0 ? (
          <p className="text-center mt-10">No creations found.</p>
        ) : (
          creations.map((item) => <CreationItem key={item._id} item={item} />)
        )}
      </div>
    </div>
  );
};

export default Dashboard;
