import { useState, useEffect } from "react";
import EventsList from "../Components/Events/EventsList";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const eventsCollectionRef = collection(db, "events");

  useEffect(() => {
    const getEvents = async () => {
      const data = await getDocs(eventsCollectionRef);
      setEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getEvents();
  }, [eventsCollectionRef]);

  return (
    <>
      <div className="text-center ">
        <h1>All Events</h1>
        <hr style={{ width: "100%" }} className="mt-0 pl-10 pr-10" />

        {events.length === 0 ? (
          <div className="my-4 border border-red-500 inline-block">
            <div>
              <p className="border-r-2 text-2xl px-2 bg-red-400">x</p>
              <p className="text-xl px-2">No Events</p>
            </div>
          </div>
        ) : (
          <EventsList events={events} />
        )}
      </div>
    </>
  );
};

export default EventPage;
