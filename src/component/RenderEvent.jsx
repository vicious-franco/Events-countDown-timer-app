import { Calendar, Pen, Trash2, Clock7 } from "lucide-react";
import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { eventTypes } from "../assets/data";

const RenderEvent = ({ name, id, desc, counts, date_time, emoji }) => {
  const {
    setEvents,
    setShowUpdateEvent,
    darkMode,
    UpdateEvent,
    setUpdateEvent,
  } = useContext(MyContext);

  const { days, hours, minutes, seconds } = counts;

  const handleDelete = (ClickedId) => {
    setEvents((prev) => {
      return prev.filter((item) => item.id !== ClickedId);
    });
  };

  const timer = new Date(date_time);
  let timeIndicator = "";
  if (timer.getHours() < 12) {
    timeIndicator = "AM";
  } else {
    timeIndicator = "PM";
  }

  const handleEditingEvent = (filterId) => {
    const localStorageEvent = JSON.parse(localStorage.getItem("events_stored"));
    const MatchEvent = localStorageEvent.find((item) => item.id === filterId);
    setShowUpdateEvent(true);

    setUpdateEvent({
      id: MatchEvent.id,
      name: MatchEvent.name,
      type: MatchEvent.type,
      desc: MatchEvent.desc,
      date_time: MatchEvent.date_time || 0,
    });
  };

  return (
    <section
      className={`w-full shadow-md  ${
        days === 0 && hours < 24
          ? `bg-orange-200 border-red-300 ${
              darkMode
                ? "dark:bg-red-950 dark:brightness-90 border-red-600"
                : ""
            } `
          : ` ${
              darkMode
                ? "bg-[#1f2937] border-[#4f46e5] "
                : "bg-white border-custom-violet-500/70 "
            }`
      } p-4 sm:p-10 mt-8 rounded-xl border-l-4 `}
    >
      <div className="flex justify-between items-center ">
        <div className="flex-col flex">
          <div className="flex items-center gap-2">
            <span className="text-3xl ">{emoji}</span>
            <div>
              <h1
                className={`font-semibold text-black ${
                  darkMode ? "text-gray-200" : ""
                } text-md sm:text-xl`}
              >
                {name}
              </h1>
              <p
                className={`hidden sm:block text-sm ${
                  darkMode ? "text-gray-200" : "text-gray-600 "
                }`}
              >
                {desc}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-4 md:gap-8">
          <span
            onClick={() => handleEditingEvent(id)}
            className="hover:bg-gray-200 block cursor-pointer  p-2 rounded-md duration-300"
          >
            <Pen
              className={` w-4 sm:w-5 ${darkMode ? "dark:text-white" : ""}`}
            />
          </span>
          <Trash2
            onClick={() => handleDelete(id)}
            className="w-4 sm:w-5 text-red-500 cursor-pointer hover:text-red-400   duration-300"
          />
        </div>
      </div>
      <div className="">
        <div className="flex text-gray-500 items-center gap-4 md:gap-6 text-sm mt-2">
          <span className=" flex items-center gap-2">
            <Calendar className="w-4" />
            <p>{new Date(date_time).toDateString()}</p>
          </span>
          <span className="flex items-center  gap-2 ">
            <Clock7 className="w-4" />
            <p>
              {timer.getHours()}:{timer.getMinutes()}:{timeIndicator}
            </p>
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4  gap-3 md:gap-12 items-center  mt-8 overflow-hidden">
          <div
            className={`  ${
              darkMode ? "dark:bg-[#374151]" : ""
            }  md:py-3  md:px-18 rounded-md flex flex-col bg-gray-100 justify-center items-center`}
          >
            <h1
              className={`${
                days === 0 && hours === 0 && minutes === 0 && seconds === 0
                  ? `${darkMode ? "dark:text-red-700" : " text-orange-400"}`
                  : "text-custom-violet-500"
              } font-bold text-xl sm:text-3xl`}
            >
              {counts.days}
            </h1>
            <p className="text-gray-500 mt-1">Days</p>
          </div>
          <div
            className={`  ${
              darkMode ? "dark:bg-[#374151]" : ""
            }  md:py-3  md:px-18 rounded-md flex flex-col bg-gray-100 justify-center items-center`}
          >
            <h1
              className={`${
                days === 0 && hours === 0 && minutes === 0 && seconds === 0
                  ? `${darkMode ? "dark:text-red-700" : " text-orange-400"}`
                  : "text-custom-violet-500"
              } font-bold text-xl sm:text-3xl`}
            >
              {counts.hours}
            </h1>
            <p className="text-gray-500 mt-1">Hours</p>
          </div>
          <div
            className={`  ${
              darkMode ? "dark:bg-[#374151]" : ""
            }  md:py-3  md:px-18 rounded-md flex flex-col bg-gray-100 justify-center items-center`}
          >
            <h1
              className={`${
                days === 0 && hours === 0 && minutes === 0 && seconds === 0
                  ? `${darkMode ? "dark:text-red-700" : " text-orange-400"}`
                  : "text-custom-violet-500"
              } font-bold text-xl sm:text-3xl`}
            >
              {counts.minutes}
            </h1>
            <p className="text-gray-500 mt-1">Minutes</p>
          </div>
          <div
            className={`  ${
              darkMode ? "dark:bg-[#374151]" : ""
            }  md:py-3  md:px-18 rounded-md flex bg-gray-100 flex-col justify-center items-center`}
          >
            <h1
              className={`${
                days === 0 && hours === 0 && minutes === 0 && seconds === 0
                  ? `${darkMode ? "dark:text-red-700" : " text-orange-400"}`
                  : "text-custom-violet-500"
              } font-bold text-xl sm:text-3xl`}
            >
              {counts.seconds}
            </h1>
            <p className="text-gray-500 mt-1">Seconds</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RenderEvent;
