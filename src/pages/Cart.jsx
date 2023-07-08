import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import {
  collection,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { Link } from "react-router-dom";
import { db } from "../firebase";
import classes from "./EventDetailPage.module.css";
import { AuthContext } from "../store/AuthContext";

const CartPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [carts, setCart] = useState([]);
  const inputRef = useRef();

  // create event cart
  const cartRef = collection(db, "cart");

  // Update Cart Document
  const updateDocument = async (collectionName, docId, newData) => {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, newData);
      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Update Cart
  const updateCart = async () => {
    try {
      // Getting the document
      const querySnapshot = await getDocs(cartRef);
      querySnapshot.forEach(async (doc) => {
        const documentData = doc.data();
        const documentId = doc.id;

        // Update the document
        const newData = { ...documentData, eventQty: inputRef.current.value };
        await updateDocument("cart", documentId, newData);
      });
    } catch (error) {
      console.error("Error getting documents:", error);
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventQuery = query(
          cartRef,
          where("user", "==", currentUser.email)
        );
        const querySnapshot = await getDocs(eventQuery);

        if (!querySnapshot.empty) {
          const cartData = querySnapshot.docs[0].data();

          setCart([cartData]);
        } else {
          console.log("No matching documents found");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchEvent();
  }, [cartRef, currentUser.email]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {carts.length > 0 ? (
        <div>
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
              {carts.map((cartItem) => (
                <tr key={cartItem.eventTitle}>
                  <td className="py-2 text-xl">{cartItem.eventTitle}</td>
                  <td className="py-2 text-xl font-medium">
                    {"₦" + cartItem.eventCost}
                  </td>
                  <td className="py-2">
                    <input
                      className="pl-3 w-12 text-xl font-semibold border border-blue-900 outline-white"
                      type="number"
                      name="qty"
                      defaultValue={cartItem.eventQty}
                      ref={inputRef}
                      min="1"
                      step="1"
                    />
                  </td>
                  <td className="py-2 text-xl font-semibold">
                    {"₦" + cartItem.eventCost * cartItem.eventQty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className={`${classes.btn} mt-4`} onClick={updateCart}>
            Update Cart
          </p>
        </div>
      ) : (
        <p className="text-2xl font-semibold">No Cart Found!</p>
      )}

      <hr />

      <div>
        <h3 className="pb-4">Cart Totals</h3>
        <table>
          <thead className="text-blue-900">
            <tr>
              <th className="pr-10 text-xl font-normal">SUBTOTAL</th>
              <th className="text-xl font-normal">
                {carts.map((cart) => `₦${cart.eventCost * cart.eventQty}`)}
              </th>
            </tr>
          </thead>
          <tbody className="text-blue-900">
            <tr>
              <td className="pr-10 text-xl font-normal">TOTAL</td>
              <td className="text-xl font-normal">
                {carts.map((cart) => `₦${cart.eventCost * cart.eventQty}`)}
              </td>
            </tr>
          </tbody>
        </table>

        <Link className={`${classes.btn} mt-4`} to={"/checkout"}>
          Proceed To Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
