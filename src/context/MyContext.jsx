import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  // toogling themes
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("darkMode");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // toogling the update component
  const [showUpdateEvent, setShowUpdateEvent] = useState(false);

  // updating the event
  const [UpdateEvent, setUpdateEvent] = useState({});

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // initial state to load and render events is available, if not available use new one
  const [events, setEvents] = useState(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events_stored"));

    if (storedEvents !== null) {
      const arrangedEvents = storedEvents.sort(
        (a, b) => a.date_time - b.date_time
      );
      return arrangedEvents;
    }
    return [];
  });

  // typing in form for handling on change for new event
  const [newEvent, setNewEvent] = useState({
    id: Date.now(),
    name: "",
    type: "",
    desc: "",
    date_time: new Date().getTime(),
  });

  // an audio bell class for expired timer

  const alarm = new Audio("/public/alarm.mp3");

  // state for toggling create event component
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const countDown = (e) => {
    const currentTime = new Date().getTime();
    const expireTime = e.date_time;
    const difference = expireTime - currentTime;

    if (difference <= 0) {
      if (!e.counts?.notified) {
        toast.warning("Event expired...");
        alarm.play();
        return { days: 0, hours: 0, minutes: 0, seconds: 0, notified: true };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0, notified: true };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      notified: e.counts?.notified || false,
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prev) => {
        return prev.map((item) => {
          const newCounts = countDown(item);
          // Only update notified status if it changed
          if (newCounts.notified && (!item.counts || !item.counts.notified)) {
            return { ...item, counts: newCounts };
          }
          return { ...item, counts: newCounts };
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
    darkMode,
    setDarkMode,
    showUpdateEvent,
    setShowUpdateEvent,
    UpdateEvent,
    setUpdateEvent,
  };
  return <MyContext.Provider value={data}>{children}</MyContext.Provider>;
};
