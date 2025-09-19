import React, { useContext, useState } from "react";
import { MyContext } from "../context/MyContext";
import { eventTypes } from "../assets/data";

const UpdateEvent = () => {
  const {
    UpdateEvent,
    setUpdateEvent,
    setEvents,
    events,
    darkMode,
    setShowUpdateEvent,
  } = useContext(MyContext);

  // console.log(writtenEvent);

  const handleUpdate = (e) => {
    e.preventDefault();
    const matchEvent = events.find((item) => item.id === UpdateEvent.id);

    setEvents((prev) => {
      const arrangeUpdate = prev.map((item) => {
        if (item.id === matchEvent.id) {
          return {
            ...item,
            name: UpdateEvent?.name,
            type: UpdateEvent?.type,
            desc: UpdateEvent?.desc,
            date_time: new Date(UpdateEvent?.date_time).getTime(),
          };
        } else {
          return item;
        }
      });
      return arrangeUpdate.sort((a, b) => a.date_time - b.date_time);
    });
    setShowUpdateEvent(false);
  };

  const showEmoji = (type) => {
    const eventEmoji = eventTypes.find((item) => item.label === type);
    return eventEmoji.emoji;
  };

  const handleNewChange = (e) => {
    if (e.target.value !== "") {
      setUpdateEvent((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  return (
    <section className="fixed top-0  left-0 bg-black/30 backdrop-blur-sm h-screen w-full flex flex-col items-center">
      <form
        onSubmit={handleUpdate}
        className={`bg-white ${
          darkMode ? "dark:bg-[#1f2937] mt-30 dark:text-gray-300" : ""
        }  mt-8 p-8 md:w-[50%] sm:w-[70%] w-[85%] rounded-xl capitalize flex flex-col gap-6  `}
      >
        <h1 className="font-bold text-xl">Update Event</h1>
        <div className="flex  flex-col justify-start">
          <label className="text-gray-700" htmlFor="title">
            Event Title
          </label>
          <input
            name="name"
            onChange={handleNewChange}
            type="text"
            id="title"
            placeholder={UpdateEvent.name ?? "Enter Event Title "}
            className={`px-4 bg-gray-100 border border-gray-300 py-1 mt-2 rounded-lg ${
              darkMode
                ? "dark:bg-[#374151]  dark:border-gray-600 dark:outline-none"
                : ""
            }`}
          />
        </div>
        <div className="flex flex-col justify-start">
          <label className="text-gray-700" htmlFor="event">
            Event Type
          </label>
          <select
            onChange={handleNewChange}
            name="type"
            id="event"
            className={`px-4 bg-gray-100 border border-gray-300 py-1 mt-2 rounded-lg ${
              darkMode
                ? "dark:bg-[#374151] dark:border-gray-600 dark:outline-none"
                : ""
            }`}
          >
            <option defaultChecked={true} className="text-gray-700">
              {showEmoji(UpdateEvent.type)} {UpdateEvent.type}
            </option>
            {eventTypes.map(({ emoji, label }, index) => {
              return (
                <option key={index + 1} value={label}>
                  {emoji} {label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col justify-start">
          <label className="text-gray-700" htmlFor="Description">
            Description
          </label>
          <textarea
            onChange={handleNewChange}
            name="desc"
            placeholder={UpdateEvent.desc ?? "Enter Event Description"}
            id="Description"
            className={`px-4 bg-gray-100 border border-gray-300 py-1 mt-2 rounded-lg ${
              darkMode
                ? "dark:bg-[#374151] dark:border-gray-600 dark:outline-none"
                : ""
            }`}
          ></textarea>
        </div>
        <div className="flex flex-col justify-start">
          <label className="text-gray-700" htmlFor="datetime">
            Event Date and time
          </label>
          <input
            onChange={handleNewChange}
            name="date_time"
            className={`px-4 bg-gray-100 border border-gray-300 py-1 mt-2 rounded-lg ${
              darkMode
                ? "dark:bg-[#374151] dark:border-gray-600 dark:outline-none"
                : ""
            }`}
            type="datetime-local"
            id="datetime"
          />
        </div>
        <div className="flex gap-5 mt-3 items-center">
          <button className="bg-custom-violet-500 hover:bg-custom-violet-500/90 duration-300 px-3 py-1 rounded-md text-white cursor-pointer">
            Update Event
          </button>
          <button
            className={`bg-gray-200  duration-300 cursor-pointer rounded-md px-3 py-1.5 ${
              darkMode ? "dark:bg-[#374151] " : "hover:bg-gray-300"
            }`}
            onClick={() => setShowUpdateEvent(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateEvent;
