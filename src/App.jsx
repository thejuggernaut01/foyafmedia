import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import { Container } from "react-bootstrap";

import RootRoute from "./pages/RootRoute";
import EventPage from "./pages/EventPage";
import CreateEventPage from "./pages/CreateEvent";
import FaqPage from "./pages/FaqPage";
import ContactUsPage from "./pages/ContactUs";
import SignUp from "./Components/User/SignUp";
import Dashboard from "./Components/User/Dashboard";
import Login from "./Components/User/Login";
import UserPageLayout from "./pages/UserPageLayout";
import UserPage from "./pages/UserPage";
import ForgotPassword from "./Components/User/ForgotPassword";
import EventDetailPage from "./pages/EventDetailPage";
import EventRoute from "./pages/EventRoute";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootRoute />,
    children: [
      {
        path: "",
        element: <EventPage />,
      },
      {
        path: "event",
        element: <EventRoute />,
        children: [
          {
            path: ":eventId",
            element: <EventDetailPage />,
          },
          { path: ":eventId/cart", element: <Cart /> },
          { path: ":eventId/checkout", element: <Checkout /> },
        ],
      },
      { path: "create-event", element: <CreateEventPage /> },
      { path: "faq", element: <FaqPage /> },
      { path: "contact-us", element: <ContactUsPage /> },
      {
        path: "dashboard",
        element: (
          <AuthProvider>
            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <Dashboard />
              </div>
            </Container>
          </AuthProvider>
        ),
      },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "log-in", element: <Login /> },
      {
        element: <UserPageLayout />,
        children: [
          {
            path: "user",
            element: <UserPage />,
            children: [
              {
                index: true,
                element: <SignUp />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
