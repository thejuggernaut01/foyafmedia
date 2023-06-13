import React from "react";

import classes from "./Footer.module.css";
import { location, mail, phone } from "../UI/svg";

const Footer = () => {
  const now = new Date();
  const currentDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
  }).format(now);
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
                  175, Ijesha Road, Surulere, Lagos State, Nigeria
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
