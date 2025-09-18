import React, { useContext } from "react";
import CreateEvent from "./component/CreateEvent";
import RenderEvent from "./component/RenderEvent";
import Navigations from "./component/Navigations";
import { MyContext } from "./context/MyContext";
import { eventTypes } from "./assets/data";

const App = () => {
  const { events, showCreateEvent, setShowCreateEvent } = useContext(MyContext);
  return (
    <section className="p-4 md:p-8  lg:py-10 lg:px-26">
      <Navigations setShowCreateEvent={setShowCreateEvent} />
      {showCreateEvent && <CreateEvent />}
      {events?.map(({ name, id, counts, type, desc, date_time }, index) => {
        const emoji = eventTypes.find((item) => item.label === type);
        const realEmoji = emoji.emoji;
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
    </section>
  );
};

export default App;
