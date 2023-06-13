import { useState } from "react";

import classes from "./EventDetailPage.module.css";
import { PaystackButton } from "react-paystack";

export default function Checkout() {
  const [checkoutDetails, setCheckoutDetails] = useState([]);

  const config = {
    reference: new Date().getTime().toString(),
    email: "foyafmedia@gmail.com",
    amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.REACT_APP_PAYSTACK,
  };

  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Pay With Paystack",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <>
      <h1 className="text-center pt-3 opacity-95">Checkout</h1>
      <hr className="w-full" />

      <div className="inline-block ml-10 space-y-3">
        <h3 className="my-4 text-2xl font-semibold">Billing Details</h3>
        <div className="flex flex-col">
          <label htmlFor="fullName" className="text-lg">
            Full Name <sup className="text-red-500">*</sup>
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            required
            className="border border-black outline-none w-[300px]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="country" className="text-lg">
            Country/Region <sup className="text-red-500">*</sup>
          </label>
          <input
            type="text"
            name="country"
            id="country"
            required
            className="border border-black outline-none w-[300px]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="state" className="text-lg">
            State <sup className="text-red-500">*</sup>
          </label>
          <input
            type="text"
            name="state"
            id="state"
            className="border border-black outline-none w-[300px]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="city" className="text-lg">
            Town/City <sup className="text-red-500">*</sup>
          </label>
          <input
            type="text"
            name="city"
            id="city"
            required
            className="border border-black outline-none w-[300px]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="street" className="text-lg">
            Street Name <sup className="text-red-500">*</sup>
          </label>
          <input
            type="text"
            name="street"
            id="street"
            className="border border-black outline-none w-[300px]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phoneNum" className="text-lg">
            Phone Number <sup className="text-red-500">*</sup>
          </label>
          <input
            type="number"
            name="phoneNum"
            id="phoneNum"
            className="border border-black outline-none w-[300px]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg">
            Email Address <sup className="text-red-500">*</sup>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border border-black outline-none w-[300px]"
          />
        </div>
      </div>

      <hr className="w-full" />

      <div className="px-4 mt-3">
        <h3>Your Order</h3>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th
                className="pr-72 text-xl font-semibold"
                style={{ borderBottom: "1px solid black" }}
              >
                Product
              </th>
              <th
                className="py-2 text-xl font-semibold"
                style={{ borderBottom: "1px solid black" }}
              >
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="py-2 text-lg"
                style={{ borderBottom: "1px solid black" }}
              >
                Lagos Event
              </td>
              <td
                className="py-2 text-lg font-semibold"
                style={{ borderBottom: "1px solid black" }}
              >
                ₦7000
              </td>
            </tr>
            <tr>
              <td
                className="py-2 text-lg"
                style={{ borderBottom: "1px solid black" }}
              >
                Subtotal
              </td>
              <td
                className="py-2 text-lg font-semibold"
                style={{ borderBottom: "1px solid black" }}
              >
                ₦7000
              </td>
            </tr>
            <tr>
              <td
                className="py-2 text-lg"
                style={{ borderBottom: "1px solid black" }}
              >
                Total
              </td>
              <td
                className="py-2 text-lg font-semibold"
                style={{ borderBottom: "1px solid black" }}
              >
                ₦7000
              </td>
            </tr>
          </tbody>
        </table>
        {/* <button className={`${classes.btn} mt-4`}>
          Pay With Paystack
        </button> */}
        <PaystackButton className={`${classes.btn} mt-4`} {...componentProps} />
      </div>
    </>
  );
}
