import React, { useState, useContext } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [error, setError] = useState("");
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      navigate("/log-in");
      setNav(!nav);
    } catch (error) {
      console.log(error);
      setError("failed to log out");
    }
  };

  return (
    <div className="flex justify-around items-center py-4 text-white">
      <div className="flex justify-around">
        {/* <Link
          to={"/"}
          className={`w-full text-2xl font-bold text-[#fdffff] no-underline cursor-pointer`}
        >
          FOYAFMEDIA
        </Link> */}
        <Link
          to={"/"}
          className="text-white no-underline cursor-pointer text-2xl font-bold"
        >
          FOYAFMEDIA
        </Link>

        <ul className="hidden md:flex md:mx-10">
          <li className="p-2">
            <Link className={classes.link} to="create-event">
              CREATE EVENT
            </Link>
          </li>
          {currentUser && (
            <li className="p-2">
              <Link className={classes.link} to="create-event">
                MY EVENTS
              </Link>
            </li>
          )}
          <li className="p-2">
            <Link className={classes.link} to="faq">
              FAQ
            </Link>
          </li>
          <li className="p-2">
            <Link className={classes.link} to="contact-us">
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="xs:hidden md:block z-10">
          {currentUser ? (
            <button
              type="button"
              className="rounded-full border pr-3 pl-3 hover:scale-110"
              onClick={handleLogout}
            >
              <Link to={"user"} className={classes.btn}>
                Log Out
              </Link>
            </button>
          ) : (
            <button
              type="button"
              className="rounded-full border pr-3 pl-3 hover:scale-110"
            >
              <Link to={"user"} className={classes.btn}>
                Join Us
              </Link>
            </button>
          )}
        </div>
      </div>

      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <AiOutlineClose className="cursor-pointer" size={20} />
        ) : (
          <AiOutlineMenu className="cursor-pointer" size={20} />
        )}
      </div>
      <ul
        className={
          nav
            ? ` fixed left-0 top-0 w-[60%] h-full border-r border-r-blue-900 bg-[#05053a] ease-in-out duration-500 `
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-xl font-bold text-[#fdffff] mx-2 my-3 ">
          <Link to={"/"} className="text-white no-underline cursor-pointer">
            FOYAFMEDIA
          </Link>
        </h1>
        <li className="mt-20 p-3 border-b border-t border-gray-600">
          <Link className={classes.link} to="create-event" onClick={handleNav}>
            CREATE EVENT
          </Link>
        </li>
        {currentUser && (
          <li className="p-3 border-b border-gray-600">
            <Link
              className={classes.link}
              to="create-event"
              onClick={handleNav}
            >
              MY EVENTS
            </Link>
          </li>
        )}
        <li className="p-3 border-b border-gray-600">
          <Link className={classes.link} to="faq" onClick={handleNav}>
            FAQ
          </Link>
        </li>
        <li className="p-3 border-b border-gray-600">
          <Link className={classes.link} to="contact-us" onClick={handleNav}>
            Contact Us
          </Link>
        </li>

        <li className="p-3 border-b border-gray-600">
          {currentUser ? (
            <Link to={"user"} className={classes.link} onClick={handleLogout}>
              Log Out
            </Link>
          ) : (
            <Link to={"user"} className={classes.link} onClick={handleNav}>
              Join Us
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
