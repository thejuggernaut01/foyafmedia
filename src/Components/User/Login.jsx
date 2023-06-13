import React, { useRef, useState, useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { Form, Link, useNavigate } from "react-router-dom";
import AuthLoader from "../UI/AuthLoader";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const ctx = useContext(AuthContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await ctx.login(emailRef.current.value, passwordRef.current.value);
      console.log(ctx.logInError);

      if (ctx.logInError) {
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Failed to Log in!");
      ctx.setLogInError(false);
    }

    setLoading(false);
  };
  return (
    <>
      <div className="text-center w-100 mt-20 mb-20">
        <div className="inline-block border border-gray-600 rounded-md mb-2">
          {(ctx.logInError && (
            <p className="bg-red-400 p-2 rounded-t-md">
              Please verify your email before you login.
            </p>
          )) ||
            (error && (
              <p className="bg-red-400 pt-1 pb-1 rounded-t-md">{error}</p>
            ))}

          <h2 className="text-2xl pt-4 pb-3 font-semibold">Log In</h2>
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
                className="border border-gray-500 outline-none rounded-md w-[20rem] pl-1 mb-2 pt-1 pb-1"
                name="email"
                type="email"
                ref={emailRef}
                required
              />
            </div>

            <div className="flex flex-col text-left">
              <label>
                Password<span className="text-red-500 ">*</span>
              </label>
              <input
                className="border border-gray-500 outline-none rounded-md pl-1 pt-1 pb-1"
                type="password"
                name="password"
                ref={passwordRef}
                required
              />
            </div>

            <button
              disabled={loading}
              className="mt-3 border border-blue-600 bg-blue-600 text-white rounded-md w-full mb-2 pt-2 pb-2"
              type="submit"
            >
              {loading ? <AuthLoader /> : "Login"}
            </button>
          </Form>
          <div className="w-100 text-center text-blue-600 mb-3">
            <Link to={"/forgot-password"}>Forgotten Password?</Link>
          </div>
        </div>

        <div className="text-center">
          Need an account?{" "}
          <Link to={"/user"} className="no-underline text-blue-600">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
