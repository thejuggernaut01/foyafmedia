import { useState, useEffect } from "react";
import EventsList from "../Components/Events/EventsList";
import Loader from "../Components/UI/Loader";

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
        <h1 className="text-3xl pt-3 pb-10">All Events</h1>
        {/* <hr className="mt-0 w-fit" /> */}

        {events.length === 0 ? <Loader /> : <EventsList events={events} />}
      </div>
    </>
  );
};

export default EventPage;
