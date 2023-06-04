import { Outlet } from "react-router-dom";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";

const RootRoute = () => {
  return (
    <>
      <div>
        {" "}
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default RootRoute;
