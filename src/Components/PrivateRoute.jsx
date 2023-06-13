// import { useContext } from "react";
// import { Route, Navigate, Routes } from "react-router-dom";

// import { AuthContext } from "../store/AuthContext";

// export default function PrivateRoute({ component: Component, ...rest }) {
//   const { currentUser } = useContext(AuthContext);

//   return (
//     <Routes>
//       <Route
//         {...rest}
//         render={(props) => {
//           return currentUser ? <Component {...props} /> : <Navigate to={"/"} />;
//         }}
//       ></Route>
//     </Routes>
//   );
// }

//   if (currentUser) {
//     <Navigate to="/login" replace />;
//     return null;
//   }

//   return currentUser ? (
//     <Routes>
//       <Route element={Element} {...rest} />
//     </Routes>
//   ) : (
//     <Navigate to="/login" replace />
//   );

// function PrivateRoute({ element: Element, ...rest }) {
//   const { currentUser } = useContext(AuthContext);

//   return currentUser ? (
//     <Routes>
//       <Route element={Element} {...rest} />
//     </Routes>
//   ) : (
//     <Navigate to="/login" replace />
//   );
// }

// export default PrivateRoute;
