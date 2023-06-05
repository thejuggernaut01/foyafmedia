import React from "react";

import classes from "./Footer.module.css";
import { location, mail, phone } from "../UI/svg";

const Footer = (props) => {
  const now = new Date();
  const currentDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
  }).format(now);
  // return (
  //   <div className="pt-10 pl-10 pr-10">
  //     <section className="md:flex justify-between">
  //       <div>
  //         <div className="flex">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke-width="1.5"
  //             stroke="currentColor"
  //             class="w-6 h-6"
  //           >
  //             <path
  //               stroke-linecap="round"
  //               stroke-linejoin="round"
  //               d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
  //             />
  //             <path
  //               stroke-linecap="round"
  //               stroke-linejoin="round"
  //               d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
  //             />
  //           </svg>
  //           <p>36, Orimolade estate ikeja, Lagos State, Nigeria</p>
  //         </div>
  //         <div className="flex">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke-width="1.5"
  //             stroke="currentColor"
  //             class="w-6 h-6"
  //           >
  //             <path
  //               stroke-linecap="round"
  //               stroke-linejoin="round"
  //               d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
  //             />
  //           </svg>
  //           <p>support@foyafmedia.com</p>
  //         </div>
  //         <div className="flex">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke-width="1.5"
  //             stroke="currentColor"
  //             class="w-6 h-6"
  //           >
  //             <path
  //               stroke-linecap="round"
  //               stroke-linejoin="round"
  //               d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
  //             />
  //           </svg>

  //         </div>
  //       </div>
  //     </section>
  //   </div>
  // );

  return (
    <section className={classes.footer}>
      <div className={classes["footer--container"]}>
        <div className={classes["footer--1"]}>
          <div className={classes.about}>
            <h1>Foyafmedia</h1>
            <div id="p">
              <p>
                Your ultimate destination for booking tickets to the most
                exciting events happening around you! We've got you covered with
                a wide range of events that will keep you entertained and
                engaged.
              </p>
            </div>
          </div>
        </div>
        <div className={classes.foot}>
          <div className={classes["footer--2"]}>
            <div className={classes.resources}>
              <h1>Resources</h1>
              <ul>
                <li className={classes.move}>
                  <p>Volunteers</p>
                </li>
                <li className={classes.move}>
                  <p>News</p>
                </li>
                <li className={classes.move}>
                  <p>Extras</p>
                </li>
                <li className={classes.move}>
                  <p>FAQs</p>
                </li>
                <li className={classes.move}>
                  <p>Contact Us</p>
                </li>
              </ul>
            </div>
          </div>

          <div className={classes["footer--3"]}>
            <div className={classes.address}>
              <h1>Address</h1>
              <div className={classes.location}>
                <h6 className="w-8 h-6 mr-2 text-red-700">{location}</h6>
                <p className={classes.move}>
                  185, Ijesha Road, Surulere, Lagos State, Nigeria
                </p>
              </div>
              <div className="phone flex">
                <h6 className="w-6 h-6 text-red-700">{phone}</h6>
                <p className={classes.move}>+234-70-2633-6278</p>
              </div>
              <div className="mail flex">
                <h6 className="w-6 h-6 text-red-700 mr-2">{mail}</h6>
                <p className={classes.move}>support@foyafmedia.com</p>
              </div>
              <div className="icons">
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-linkedin-in"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className={classes["footer--footer"]}>
        <div className={classes["foo--1"]}>
          &copy;{currentDate} Foyafmedia, designed by <span>OVO Designs</span>
        </div>

        <div className={classes["foo--2"]}>Privacy | Terms & Condition</div>
      </div>
    </section>
  );
};

export default Footer;
