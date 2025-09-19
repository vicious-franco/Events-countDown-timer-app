import React, { useContext } from "react";
import CreateEvent from "./component/CreateEvent";
import RenderEvent from "./component/RenderEvent";
import Navigations from "./component/Navigations";
import { MyContext } from "./context/MyContext";
import { eventTypes } from "./assets/data";
import UpdateEvent from "./component/UpdateEvent";
import { ToastContainer } from "react-toastify";

const App = () => {
  const {
    events,
    showCreateEvent,
    showUpdateEvent,

    setShowCreateEvent,
    darkMode,
  } = useContext(MyContext);
  return (
    <section
      className={` min-h-screen  bg-[#ebf2ff] ${
        darkMode ? "dark:bg-[#111827]" : ""
      } p-4 md:p-8  lg:py-10 lg:px-26 `}
    >
      <ToastContainer position="top-center" />
      <Navigations setShowCreateEvent={setShowCreateEvent} />
      {showCreateEvent && <CreateEvent />}
      {events?.map(({ name, id, counts, type, desc, date_time }, index) => {
        const emoji = eventTypes.find((item) => item.label === type);
        const realEmoji = emoji?.emoji;
        return (
          <RenderEvent
            key={index + 1}
            id={id}
            name={name}
            emoji={realEmoji}
            type={type}
            desc={desc}
            date_time={date_time}
            counts={counts}
          />
        );
      })}
      {showUpdateEvent && <UpdateEvent />}
    </section>
  );
};

export default App;
