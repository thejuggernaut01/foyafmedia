import { useState, useEffect, useContext } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import classes from "./EventDetailPage.module.css";
import { PaystackButton } from "react-paystack";
import { db } from "../firebase";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

import { Email } from "../Components/Helper";

import QRCode from "qrcode";

const currentDate = new Date();

// Get date components
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
const day = String(currentDate.getDate()).padStart(2, "0");

export default function Checkout() {
  const [cartData, setcartData] = useState([]);

  const [qrImageUrl, setQrImageUrl] = useState("");

  const [billingName, setBillingName] = useState("");
  const [billingPhone, setBillingPhone] = useState("");
  const [billingEmail, setBillingEmail] = useState("");

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const cartCollection = collection(db, "cart");
  const checkoutCollection = collection(db, "checkout");

  // get cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartRef = query(
          cartCollection,
          where("user", "==", currentUser.email)
        );

        const querySnapshot = await getDocs(cartRef);
        if (!querySnapshot.empty) {
          const cartData = querySnapshot.docs[0].data();
          setcartData(cartData);
        } else {
          console.log("No Document Found");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCart();
  }, [cartCollection, currentUser.email]);

  // config option
  const config = {
    reference: new Date().getTime().toString(),
    email: billingEmail,
    amount: 100 * +(cartData.eventCost * cartData.eventQty), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.REACT_APP_PAYSTACK,
  };

  const handlePaystackSuccessAction = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    if (currentUser && reference.status === "success") {
      try {
        // add checkout detail to database
        await addDoc(checkoutCollection, {
          userEmail: currentUser.email,
          billingName,
          billingPhone,
          billingEmail,
          transNum: reference.trans,
          refId: reference.reference,
          status: reference.status,
          QRCodeUsed: false,
          paymentDate: `${year}-${month}-${day}`,
        });

        // Send Email
        const smtpConfig = {
          Host: process.env.REACT_APP_MAIL_HOST,
          Username: process.env.REACT_APP_MAIL_USERNAME,
          Password: process.env.REACT_APP_MAIL_PASSWORD,
          To: `${billingEmail}`,
          From: "foyafmedia@gmail.com",
          Subject: "Confirmation: Your Event Ticket Purchase",
          Body: `<body style="padding:0; margin: 0;background: #f5f6f8" data-new-gr-c-s-check-loaded="14.1091.0" data-gr-ext-installed="" data-new-gr-c-s-loaded="14.1091.0"><table style="height: 100%; width: 100%; background-color: #f5f6f8;" align="center"><tbody><tr><td valign="top" id="dbody" data-version="2.31" style="width: 100%; height: 100%; padding-top: 50px; padding-bottom: 50px; background-color: #f5f6f8;"><!--[if (gte mso 9)|(IE)]><table align="center" style="max-width:692px" width="692" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><!--[if (gte mso 9)|(IE)]><table align="center" style="max-width:640px" width="640" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><!--[if (gte mso 9)|(IE)]><table align="center" style="max-width:600px" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><!--[if (gte mso 9)|(IE)]><table align="center" style="max-width:600px" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><!--[if (gte mso 9)|(IE)]><table align="center" style="max-width:600px" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><table class="layer_1" align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 692px; box-sizing: border-box; width: 100%; margin: 0px auto;"><tbody><tr><td class="drow" valign="top" align="center" style="background-color: #f9fafb; box-sizing: border-box; font-size: 0px; text-align: center;"><!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><div class="layer_2" style="max-width: 100%; display: inline-block; vertical-align: top; width: 100%;"><table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="edtext" style="padding: 28px; text-align: left; color: #5f5f5f; font-size: 15px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;"><p class="text-center" style="line-height: 1.25em; text-align: center; margin: 0px; padding: 0px;"><span style="font-size: 28px;">Order Details and Payment Confirmation</span></p><p style="margin: 0px; padding: 0px;">
</p><p class="text-center" style="line-height: 1.25em; text-align: center; margin: 0px; padding: 0px;"><br></p>
<p style="line-height: 1.25em; margin: 0px; padding: 0px;"><br></p><p style="line-height: 1.25em; margin: 0px; padding: 0px;">Dear ${billingName},</p>
<p class="text-center" style="line-height: 1.25em; text-align: center; margin: 0px; padding: 0px;">Thank you for purchasing a ticket for ${
            cartData.eventTitle
          }! We're excited to have you join us for this special event. Below are the details of your purchase:</p><p class="text-center" style="line-height: 1.25em; text-align: center; margin: 0px; padding: 0px;"><br></p></td></tr></tbody></table></div><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;"><!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><div class="layer_2" style="max-width: 100%; display: inline-block; vertical-align: top; width: 100%;"><table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="edtext" style="padding: 32px; text-align: left; color: #5f5f5f; font-size: 15px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;"><p class="style2 text-center" style="line-height: 1.75em; text-align: center; margin: 0px; padding: 0px; color: #000000; font-size: 26px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;"><span style="font-size: 20px;">Event Details</span></p><p style="margin: 0px; padding: 0px;">Event: ${
            cartData.eventTitle
          }<br>Date: ${cartData.eventDate}<br>Time: ${
            cartData.eventTime
          }<br>Venue: ${
            cartData.eventVenue
          }</p><p style="margin: 0px; padding: 0px;">Cost:&nbsp;${
            cartData.eventCost
          }<br>Quantity:&nbsp;${cartData.eventQty}<br>Total Amount Paid: ${
            cartData.eventQty * cartData.eventCost
          }</p><p style="margin: 0px; padding: 0px;">&nbsp;</p><p style="margin: 0px; padding: 0px;"><br></p><p class="text-center" style="text-align: center; margin: 0px; padding: 0px;"><span style="font-size: 18px;"><strong>Payment Details</strong></span></p><p style="margin: 0px; padding: 0px;">Payment Method: Paystack<br>Transaction ID: ${
            reference.trans
          }<br>Payment Date: ${year}-${month}-${day}</p><p style="margin: 0px; padding: 0px;"><br></p><p style="margin: 0px; padding: 0px;"><br></p><p style="margin: 0px; padding: 0px;">If you have any questions or need further assistance, feel free to contact our support team at foyafmedia@gmail.com or by phone at +234-7026336278. We're here to help!</p><p style="margin: 0px; padding: 0px;"><br></p>
<p style="margin: 0px; padding: 0px;">Thank you again for your purchase, and we look forward to seeing you at the event!</p><p style="margin: 0px; padding: 0px;"><br></p>
<p style="margin: 0px; padding: 0px;">Best regards,&nbsp;</p><p style="margin: 0px; padding: 0px;">Foyafmedia</p><p style="margin: 0px; padding: 0px;"><br></p></td></tr></tbody></table></div><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr><tr><td class="drow" valign="top" align="center" style="background-color: #f5f6f8; box-sizing: border-box; font-size: 0px; text-align: center;"><!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><div class="layer_2" style="max-width: 100%; display: inline-block; vertical-align: top; width: 100%;"><table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 15px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;"><p class="text-center" style="line-height: 1.75em; text-align: center; margin: 0px; padding: 0px;"><span style="font-size: 11px;">If you no longer wish to receive mail from us, you can <a href="{unsubscribe}" style="color: #5457ff; text-decoration: none;">unsubscribe</a></span><br><span style="font-size: 11px;">foyafmedia@gmail.com</span></p></td></tr></tbody></table></div><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr></tbody></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr></tbody></table></body>`,
        };

        Email.send(smtpConfig);

        // const response = QRCode.toDataURL({
        //   eventName: cartData.eventTitle,
        //   price: cartData.eventCost,
        //   qty: cartData.eventQty,
        //   billingName,
        //   billingEmail,
        //   billingPhone,

        //   refId: reference.reference,
        //   paymentStatus: reference.status,
        // });
        // setQrImageUrl(response);

        try {
          console.log(await QRCode.toDataURL("text"));
        } catch (err) {
          console.error(err);
        }

        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }

    console.log(reference);
  };

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
      <h1 className="text-center pt-3 opacity-95 text-2xl">Checkout</h1>
      <hr className="w-full" />

      {/* Form Input */}
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
            value={billingName}
            onChange={(event) => setBillingName(event.target.value)}
            required
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
            value={billingPhone}
            onChange={(event) => setBillingPhone(event.target.value)}
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
            value={billingEmail}
            onChange={(event) => setBillingEmail(event.target.value)}
            className="border border-black outline-none w-[300px]"
          />
        </div>
      </div>

      {/* Checkout Table */}
      <hr className="w-full mt-10" />
      <h3 className="text-3xl text-center my-2">Your Order</h3>
      <hr className="w-full" />

      <div className="px-4">
        <table className="w-[90%] mx-auto">
          <thead>
            <tr className="flex justify-between border-b-black border-b-2">
              <th className="text-xl font-semibold">Product</th>
              <th className="py-2 text-xl font-semibold">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr className="flex justify-between border-b-black border-b-2">
              <td className="py-2 text-lg">
                {cartData.eventTitle ? cartData.eventTitle : ""}
                {cartData.eventQty ? " x" + cartData.eventQty : ""}
              </td>
              <td className="py-2 text-lg font-semibold">
                ₦ {cartData.eventCost}
              </td>
            </tr>

            <tr className="flex justify-between border-b-black border-b-2">
              <td className="py-2 text-lg">Subtotal</td>
              <td className="py-2 text-lg font-semibold">
                ₦{" "}
                {cartData.eventCost
                  ? cartData.eventCost * cartData.eventQty
                  : 0}
              </td>
            </tr>
            <tr className="flex justify-between border-b-black border-b-2">
              <td className="py-2 text-lg">Total</td>
              <td className="py-2 text-lg font-semibold">
                ₦{" "}
                {cartData.eventCost
                  ? cartData.eventCost * cartData.eventQty
                  : 0}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="w-[90%] mx-auto">
          <PaystackButton
            className={`${classes.btn}  my-4`}
            {...componentProps}
          />
        </div>
      </div>
    </>
  );
}
