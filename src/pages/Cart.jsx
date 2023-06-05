import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import classes from "./EventDetailPage.module.css";

const CartPage = () => {
  const [event, setEvent] = useState([
    {
      eventTitle: "",
      eventCost: "",
    },
  ]);

  const { eventId } = useParams();
  // create event cart
  const eventsRef = collection(db, "events");

  const updateCart = () => {};

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventQuery = query(eventsRef, where("eventId", "==", eventId));
        const querySnapshot = await getDocs(eventQuery);

        if (!querySnapshot.empty) {
          const eventData = querySnapshot.docs[0].data();

          setEvent(eventData);
        } else {
          console.log("No matching documents found");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchEvent();
  }, [eventId, eventsRef]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2">Product</th>
            <th className="py-2">Price</th>
            <th className="py-2">Quantity</th>
            <th className="py-2">Subtotal</th>
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
                name="qty"
                defaultValue={1}
                min="1"
                step="1"
              />
            </td>
            {/* <td className="py-2">{event.eventCost * 1}</td> */}
          </tr>
        </tbody>
      </table>
      <p className={`${classes.btn} mt-4`} onClick={updateCart}>
        Update Cart
      </p>
    </div>
  );
};

export default CartPage;
