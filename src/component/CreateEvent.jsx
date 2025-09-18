import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { eventTypes } from "../assets/data";

const CreateEvent = () => {
  const {
    setEvents,
    newEvent,
    setNewEvent,

    setShowCreateEvent,
  } = useContext(MyContext);

  const addEvents = (e) => {
    e.preventDefault();
    setEvents((prev) => {
      return [
        ...prev,
        {
          id: Date.now(),
          name: newEvent.name,
          type: newEvent.type,
          desc: newEvent.desc,
          date_time: new Date(newEvent.date_time).getTime(),
          counts: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        },
      ];
    });
    e.target.reset();
  };
  const handleNewChange = (e) => {
    if (e.target.value !== "") {
      setNewEvent((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  return (
    <form
      onSubmit={addEvents}
      className="bg-white  mt-8 p-8 rounded-xl capitalize flex flex-col gap-6"
    >
      <h1 className="font-bold text-xl">Add new event</h1>
      <div className="flex  flex-col justify-start">
        <label className="text-gray-700" htmlFor="title">
          Event Title
        </label>
        <input
          name="name"
          onChange={handleNewChange}
          type="text"
          id="title"
          placeholder={newEvent.name ?? "Enter Event Title "}
          className="px-4 bg-gray-100 border border-gray-300 py-1 mt-2 rounded-lg"
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
          className="px-4 bg-gray-100 border  border-gray-300 py-1.5 mt-2 rounded-lg"
        >
          <option
            defaultChecked={true}
            className="text-gray-700"
            value="select a type"
          >
            Select a Type
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
          placeholder={newEvent.desc ?? "Enter Event Description"}
          id="Description"
          className="px-4 bg-gray-100 border  border-gray-300 py-1.5 mt-2 rounded-lg"
        ></textarea>
      </div>
      <div className="flex flex-col justify-start">
        <label className="text-gray-700" htmlFor="datetime">
          Event Date and time
        </label>
        <input
          onChange={handleNewChange}
          name="date_time"
          className="px-4 bg-gray-100 border  border-gray-300 py-1.5 mt-2 rounded-lg"
          type="datetime-local"
          id="datetime"
        />
      </div>
      <div className="flex gap-5 mt-3 items-center">
        <button className="bg-custom-violet-500 hover:bg-custom-violet-500/90 duration-300 px-3 py-1 rounded-md text-white cursor-pointer">
          Add Event
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 duration-300 cursor-pointer rounded-md px-3 py-1.5 "
          onClick={() => setShowCreateEvent(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateEvent;
