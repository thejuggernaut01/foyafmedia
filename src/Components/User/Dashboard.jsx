import React, { useContext, useState } from "react";

import { Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../store/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      navigate("/log-in");
    } catch (error) {
      console.log(error);
      setError("failed to log out");
    }
  };

  return (
    <>
      {currentUser ? (
        <div>
          <Card>
            <Card.Body>
              <h1 className="text-center">Dashboard</h1>
              <h2 className="text-center mb-4">Profile </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email: </strong> {currentUser && currentUser.email}
              <Link
                to={"/update-profile"}
                className="btn btn-primary w-100 mt-3"
              >
                Update Profile
              </Link>
            </Card.Body>
          </Card>

          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>
      ) : (
        <Navigate replace to="/log-in" />
      )}
    </>
  );
}