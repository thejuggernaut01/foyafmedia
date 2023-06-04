import React from "react";

import classes from "./Header.module.css";
import MainNavigation from "./MainNavigation";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <MainNavigation />

        <div className={`${classes["header-content"]}`}>
          <h1 className=" text-center mb-4 text-4xl">HOME</h1>
          <p className="xs:pl-10 xs:pr-10 lg:pl-32 lg:pr-32 xl:pl-52 xl:pr-52 text-justify">
            Welcome to Foyafmedia, your ultimate destination for booking tickets
            to the most exciting events happening around you! We've got you
            covered with a wide range of events that will keep you entertained
            and engaged. So come and join us for an unforgettable experience
            that will leave you wanting more. Book your tickets now!
          </p>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
