import { useState, useEffect } from "react";

import "./css/style.css";

import CalendarHeader from "./components/CalendarHeader";
import CalendarBody from "./components/CalendarBody";
import EventModal from "./components/EventModal";

const API_URL = "http://localhost:3000/events/";

interface CalendarEvent {
  id: number | null;
  title: string;
  startDateTime: string;
  endDateTime: string;
  category: string;
}

interface FetchEvent {
  id: CalendarEvent["id"];
  title: CalendarEvent["title"];
  start_datetime: CalendarEvent["startDateTime"];
  end_datetime: CalendarEvent["endDateTime"];
  category: CalendarEvent["category"];
}

const App = () => {
  const modal = document.getElementById("modal") as HTMLDialogElement | null;
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [targetEvent, setTargetEvent] = useState<CalendarEvent>({
    id: null,
    title: "",
    startDateTime: "",
    endDateTime: "",
    category: "personal",
  });

  const onModalOpen = () => {
    if (modal) {
      modal.showModal();
    }
  };
  const onModalClose = () => {
    if (modal) {
      modal.close();
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    if (targetEvent.id !== null && modal) {
      modal.showModal();
    }
  }, [targetEvent]);

  const fetchEvent = () => {
    fetch(API_URL)
      .then((responseData) => {
        return responseData.json();
      })
      .then((results) => {
        const fetchData = results.map((result: FetchEvent) => {
          return {
            id: result.id,
            title: result.title,
            startDateTime: result.start_datetime,
            endDateTime: result.end_datetime,
            category: result.category,
          };
        });
        setEvents(fetchData);
      });
  };

  useEffect(() => {
    console.log(events);
  }, [events]);

  const addEvent = (
    title: string,
    startDateTime: string,
    endDateTime: string,
    category: string
  ) => {
    const addData = { title, startDateTime, endDateTime, category };
    fetch(API_URL, {
      body: JSON.stringify(addData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(fetchEvent);
  };

  const editEvent = (
    id: number | null,
    title: string,
    startDateTime: string,
    endDateTime: string,
    category: string,
  ) => {
    const targetUrl = API_URL + id;
    const editData = { id, title, startDateTime, endDateTime, category };
    fetch(targetUrl, {
      body: JSON.stringify(editData),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(fetchEvent);
  };

  const deleteEvent = (id: number | null) => {
    const targetUrl = API_URL + id;
    fetch(targetUrl, {
      method: "DELETE",
    }).then(fetchEvent);
  };

  return (
    <>
      <div className="flex h-dvh flex-col">
        <CalendarHeader
          date={date}
          setDate={setDate}
          onModalOpen={onModalOpen}
        />
        <CalendarBody
          date={date}
          events={events}
          setTargetEvent={setTargetEvent}
        />
      </div>
      <EventModal
        onModalClose={onModalClose}
        addEvent={addEvent}
        deleteEvent={deleteEvent}
        targetEvent={targetEvent}
        setTargetEvent={setTargetEvent}
        editEvent={editEvent}
      />
    </>
  );
};

export default App;
