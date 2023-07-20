import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../store/AuthContext";
import classes from "./EventDetailPage.module.css";
import Loader from "../Components/UI/Loader";

export default function EventDetailPage() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [eventQty, setEventQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const [event, setEvent] = useState({
    eventTitle: "",
    eventDescription: "",
    eventImage: "",
    eventOrganizer: "",
    eventVenue: "",
    eventDate: "",
    eventTime: "",
    eventCost: "",
  });
  const { eventId } = useParams();
  const eventsRef = collection(db, "events");

  const cartCollection = collection(db, "cart");

  const buyTicket = async () => {
    if (currentUser) {
      // if (
      //   query(
      //     cartCollection,
      //     where(
      //       "eventTitle",
      //       "==",
      //       event.eventTitle && "user",
      //       "==",
      //       currentUser.email
      //     )
      //   )
      // ) {
      //   navigate("cart");
      //   return;
      // }
      try {
        await addDoc(cartCollection, {
          eventTitle: event.eventTitle,
          eventCost: event.eventCost,
          eventQty,
          eventVenue: event.eventVenue,
          eventTime: event.eventTime,
          eventDate: event.eventDate,
          user: currentUser.email,
        });
        navigate("cart");
      } catch (err) {
        console.log(err.message);
      }
    } else {
      navigate("/log-in");
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const eventQuery = query(eventsRef, where("eventId", "==", eventId));
        const querySnapshot = await getDocs(eventQuery);

        if (!querySnapshot.empty) {
          const eventData = querySnapshot.docs[0].data();

          setEvent(eventData);
        } else {
          console.log("No matching documents found");
        }
      } catch (error) {
        setLoading(false);
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchEvent();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center pt-5 mb-10">
          <Loader />
        </div>
      ) : (
        <article className="text-center my-10">
          <div className="inline-block">
            <div className="">
              <img
                className="block mx-auto sm:w-[80%] lg:w-[60%]"
                src={event.eventImage}
                alt={`${event.eventTitle} Art`}
              />
            </div>
            <h1 className="text-3xl py-3">{event.eventTitle}</h1>

            <div className="space-y-5">
              {event.eventDescription && (
                <div className="text-left border border-gray-500 rounded-lg block mx-auto w-[80%]">
                  <h4 className="px-3 pt-1">Event Description</h4>
                  <hr className="block mx-auto w-full mt-0" />
                  <p className="px-3">{event.eventDescription}</p>
                </div>
              )}

              {event.eventOrganizer && (
                <div className="text-left border border-gray-500 rounded-lg block mx-auto w-[80%]">
                  <h4 className="px-3 pt-1">Event Organizers</h4>
                  <hr className="block mx-auto w-full mt-0" />
                  <p className="px-3 text-xl">{event.eventOrganizer}</p>
                </div>
              )}

              {event.eventVenue && (
                <div className="text-left border border-gray-500 rounded-lg block mx-auto w-[80%]">
                  <h4 className="px-3 pt-1">Event Location</h4>
                  <hr className="block mx-auto w-full my-0" />
                  <p className="px-3 my-2 text-xl">{event.eventVenue}</p>
                </div>
              )}

              {event.eventTime && event.eventDate && (
                <div className="text-left border border-gray-500 rounded-lg block mx-auto w-[80%]">
                  <h4 className="px-3 pt-1">Event Date & Time</h4>
                  <hr className="block mx-auto w-full my-0" />
                  <div className="px-3 my-2 text-xl">
                    <p className="my-0">{event.eventDate}</p>
                    <time className="my-0">{event.eventTime}</time>
                  </div>
                </div>
              )}

              {event.eventCost && (
                <div className="text-left border border-gray-500 rounded-lg block mx-auto w-[80%]">
                  <h4 className="px-3 pt-1">Event Cost</h4>
                  <hr className="block mx-auto w-full my-0" />
                  <p className="px-3 my-2 text-lg">
                    #{event.eventCost === 0 ? "FREE" : event.eventCost}
                  </p>
                </div>
              )}

              {event.eventWebsite && (
                <div className="text-left border border-gray-500 rounded-lg block mx-auto w-[80%]">
                  <h4 className="px-3 pt-1">Event Website</h4>
                  <hr className="block mx-auto w-full my-0" />
                  <p className="px-3 my-2 text-lg">{event.eventWebsite}</p>
                </div>
              )}

              <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Ticket</h1>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="py-2">Product</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">{event.eventTitle}</td>
                      <td className="py-2">{event.eventCost}</td>
                      <td className="py-2">
                        <input
                          className="pl-3 w-12 text-xl font-semibold border border-blue-900 outline-white"
                          type="number"
                          // defaultValue={1}
                          min="0"
                          step="1"
                          value={eventQty}
                          onChange={(event) => {
                            setEventQty(event.target.value);
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-x-10">
                <p onClick={buyTicket} className={`${classes.btn}`}>
                  Buy Ticket
                </p>
              </div>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
