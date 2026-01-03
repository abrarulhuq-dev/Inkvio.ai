import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { dummyPublishedCreationData } from "../assets/assets";
import { Heart } from "lucide-react";

const Community = () => {
  const [creations, setCreations] = React.useState([]);
  const { user } = useUser();

  const fetchcreations = async () => {
    setCreations(dummyPublishedCreationData);
  };

  useEffect(() => {
    if (user) {
      fetchcreations();
    }
  }, [user]);

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <p>Creations</p>
      <div className="bg-white h-full rounded-xl overflow-y-scroll sidepanel-scrollbar ">
        
        {creations.map((creation, idx) => (
          <div
            key={idx}
            className="relative group inline-block pl-4 pt-3 w-full sm:max:-w-1/2 lg:max-w-1/3"
          >
            <img
              src={creation.content}
              alt=""  
              className="w-full h-fll object-cover rounded-lg"
            />
            <div className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
              <p className="text-sm hidden group-hover:block">
                {creation.prompt}
              </p>
              <div className="flex gap-1 items-center">
                <p className="text-sm text-gray-500">{creation.likes.length}</p>
                <Heart className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${creation.likes.includes(user.id) ? 'fill-red-500 text-red-50' : 'text-white '}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
