import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  // initial state to load and render events is available, if not available use new one
  const [events, setEvents] = useState(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events_stored"));

    if (storedEvents !== null) {
      return storedEvents;
    }
    return [];
  });

  const [newEvent, setNewEvent] = useState({
    id: Date.now(),
    name: "",
    type: "",
    desc: "",
    date_time: new Date().getTime(),
  });

  // state for toggling create event component
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const countDown = (e) => {
    const currentTime = new Date().getTime();
    const expireTime = e.date_time;
    const difference = expireTime - currentTime;

    if (difference <= 0) {
      console.log("Event expired");
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prev) => {
        return prev.map((item) => {
          return { ...item, counts: countDown(item) };
        });
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("events_stored", JSON.stringify(events));
  }, [events]);

  const data = {
    showCreateEvent,
    setShowCreateEvent,
    events,
    setEvents,
    newEvent,
    setNewEvent,
  };
  return <MyContext.Provider value={data}>{children}</MyContext.Provider>;
};
