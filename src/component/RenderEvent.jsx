import { Calendar, Pen, Trash2, Clock7 } from "lucide-react";
import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { eventTypes } from "../assets/data";

const RenderEvent = ({ name, id, desc, counts, date_time, emoji }) => {
  const { setEvents, events, setNewEvent, setShowCreateEvent } =
    useContext(MyContext);

  const { days, hours, minutes, seconds } = counts;

  const handleDelete = (ClickedId) => {
    setEvents((prev) => {
      return prev.filter((item) => item.id !== ClickedId);
    });
  };

  const handleEditingEvent = (filterId) => {
    const localStorageEvent = JSON.parse(localStorage.getItem("events_stored"));
    const MatchEvent = localStorageEvent.find((item) => item.id === filterId);
    console.log(MatchEvent);
    setShowCreateEvent(true);
    setNewEvent({
      name: MatchEvent.name,
      type: MatchEvent.type,
    }),
      console.log(MatchEvent);
  };

  return (
    <section
      className={`w-full ${
        days === 0 && hours < 24
          ? "bg-orange-200 border-orange-400"
          : "bg-white border-custom-violet-500/70"
      } p-4 sm:p-10 mt-8 rounded-xl border-l-4 `}
    >
      <div className="flex justify-between items-center ">
        <div className="flex-col flex">
          <div className="flex items-center gap-2">
            <span className="text-3xl ">{emoji}</span>
            <div>
              <h1 className="font-semibold text-black text-md sm:text-xl">
                {name}
              </h1>
              <p className="hidden sm:block text-gray-600 text-sm">{desc}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-4 md:gap-8">
          <span
            onClick={() => handleEditingEvent(id)}
            className="hover:bg-gray-200 block cursor-pointer  p-2 rounded-md duration-300"
          >
            <Pen className=" w-4 sm:w-5" />
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
              {new Date(date_time).getHours()}:
              {new Date(date_time).getMinutes()} AM
            </p>
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4  gap-3 md:gap-12 items-center  mt-8 overflow-hidden">
          <div className=" md:py-3 bg-gray-100 md:px-18 rounded-md flex flex-col justify-center items-center">
            <h1
              className={`${
                days === 0 && hours === 0 && minutes === 0 && seconds === 0
                  ? "text-orange-400"
                  : "text-custom-violet-500"
              } font-bold text-xl sm:text-3xl`}
            >
              {counts.days}
            </h1>
            <p className="text-gray-500 mt-1">Days</p>
          </div>
          <div className=" md:py-3 bg-gray-100 md:px-18 rounded-md flex flex-col justify-center items-center">
            <h1
              className={`${
                days === 0 && hours === 0 && minutes === 0 && seconds === 0
                  ? "text-orange-400"
                  : "text-custom-violet-500"
              } font-bold text-xl sm:text-3xl`}
            >
              {counts.hours}
            </h1>
            <p className="text-gray-500 mt-1">Hours</p>
          </div>
          <div className=" md:py-3 bg-gray-100 md:px-18 rounded-md flex flex-col justify-center items-center">
            <h1
              className={`${
                days === 0 && hours === 0 && minutes === 0 && seconds === 0
                  ? "text-orange-400"
                  : "text-custom-violet-500"
              } font-bold text-xl sm:text-3xl`}
            >
              {counts.minutes}
            </h1>
            <p className="text-gray-500 mt-1">Minutes</p>
          </div>
          <div className=" md:py-3 bg-gray-100 md:px-18 rounded-md flex flex-col justify-center items-center">
            <h1
              className={`${
                days === 0 && hours === 0 && minutes === 0 && seconds === 0
                  ? "text-orange-400"
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
