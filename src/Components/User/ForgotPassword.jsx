import React, { useRef, useState, useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { Form, Link } from "react-router-dom";

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const emailRef = useRef();

  const { resetPassword } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions!");
    } catch (error) {
      setError("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="text-center w-100 mt-20 mb-20">
        <div className="inline-block border border-gray-600 rounded-md">
          {error && (
            <p className="bg-red-400 pt-1 pb-1 rounded-t-md">{error}</p>
          )}
          {message && (
            <p className="bg-green-400 pt-1 pb-1 rounded-t-md">{message}</p>
          )}

          <h2 className="text-2xl pt-2 pb-3 font-semibold">Password Reset</h2>
          <Form
            method="post"
            action="user/log-in"
            className="pl-5 pr-5"
            onSubmit={submitHandler}
          >
            <div className="flex flex-col text-left">
              <label>
                Email<span className="text-red-500 ">*</span>
              </label>
              <input
                className="border border-gray-500 outline-none rounded-md w-[20rem] pl-1 mb-3 pt-1 pb-1"
                name="email"
                type="email"
                ref={emailRef}
                required
              />
            </div>

            <button
              disabled={loading}
              className="mt-2 border border-blue-600 bg-blue-600 text-white rounded-md w-full mb-2 pt-1 pb-1"
              type="submit"
            >
              Reset Password
            </button>
          </Form>

          <div className="w-100 text-center mb-2 text-blue-600">
            <Link to={"/log-in"}>Login</Link>
          </div>
        </div>
        <div className="text-center">
          Need an account?{" "}
          <Link to={"/user"} className="underline text-blue-600">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
