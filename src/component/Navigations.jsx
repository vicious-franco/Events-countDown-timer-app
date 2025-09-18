import React from "react";
import { Calendar, Moon, Plus } from "lucide-react";

const Navigations = ({ setShowCreateEvent }) => {
  return (
    <nav className="flex justify-between items-center">
      <div className=" flex items-start sm:items-center gap-1 text-custom-violet-500 cursor-pointer">
        <Calendar className="max-w-8 md:w-14 md:h-14 " />
        <h1 className="text-xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-custom-violet-500 to-purple-600">
          Event CountDown
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowCreateEvent((prev) => !prev)}
          className="cursor-pointer bg-custom-violet-500 text-white flex items-center gap-2 rounded-md py-1.5 px-2"
        >
          <Plus />
          <h1 className="hidden sm:block">Add Event</h1>
        </button>
        <span className="p-2.5 duration-300 bg-white hover:bg-gray-100 cursor-pointer rounded-lg">
          <Moon className="w-5" />
        </span>
      </div>
    </nav>
  );
};

export default Navigations;
