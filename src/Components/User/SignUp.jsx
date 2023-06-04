import React, { useRef, useState, useContext } from "react";
// import { Form, Button, Card, Alert } from "react-bootstrap";
import { AuthContext } from "../../store/AuthContext";
import { Form, Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function SignUp() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const ctx = useContext(AuthContext);

  const navigate = useNavigate();

  // create collection for users
  const usersCollection = collection(db, "users");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (
      firstNameRef.current.value.trim() === "" ||
      lastNameRef.current.value.trim() === ""
    ) {
      return setError("Name fields cannot be empty");
    }
    if (
      passwordRef.current.value.length < 6 &&
      passwordConfirmRef.current.value.length < 6
    ) {
      return setError("Password must be at least 6 characters long");
    }

    try {
      setError("");
      setLoading(true);
      await ctx.signUp(emailRef.current.value, passwordRef.current.value);

      await addDoc(usersCollection, {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        emailAddress: emailRef.current.value,
      });

      navigate("/dashboard");
    } catch (error) {
      setError("Failed to create an account!");
      console.log(error.message);
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
          <h2 className="text-2xl pt-2 pb-3 font-semibold">Sign Up</h2>
          <Form className="pl-5 pr-5" onSubmit={submitHandler}>
            <div className="flex flex-col text-left">
              <label>
                First name<span className="text-red-500 ">*</span>
              </label>
              <input
                className="border border-gray-500 outline-none rounded-md w-[20rem] pl-1 mb-3 pt-1 pb-1"
                type="text"
                name="FName"
                ref={firstNameRef}
                required
              />
            </div>

            <div className="flex flex-col text-left">
              <label>
                Last name<span className="text-red-500 ">*</span>
              </label>
              <input
                className="border border-gray-500 outline-none rounded-md w-[20rem] pl-1 mb-3 pt-1 pb-1"
                type="text"
                name="FName"
                ref={lastNameRef}
                required
              />
            </div>

            <div className="flex flex-col text-left">
              <label>
                Email<span className="text-red-500 ">*</span>
              </label>
              <input
                className="border border-gray-500 outline-none rounded-md w-[20rem] pl-1 mb-3 pt-1 pb-1"
                type="email"
                name="email"
                ref={emailRef}
                required
              />
            </div>

            <div className="flex flex-col text-left">
              <label>
                Password<span className="text-red-500 ">*</span>
              </label>
              <input
                className="border border-gray-500 outline-none rounded-md pl-1 mb-3 pt-1 pb-1"
                type="password"
                name="password"
                ref={passwordRef}
                required
              />
            </div>

            <div className="flex flex-col text-left">
              <label>
                Confirm Password<span className="text-red-500 ">*</span>
              </label>
              <input
                className="border border-gray-500 outline-none rounded-md pl-1 pt-1 pb-1"
                type="password"
                name="confirmPassword"
                ref={passwordConfirmRef}
                required
              />
            </div>

            <button
              disabled={loading}
              className="mt-3 border border-blue-600 bg-blue-600 text-white rounded-md w-full mb-4 pt-1 pb-1"
              type="submit"
            >
              Sign up
            </button>
          </Form>
        </div>
        <div className="text-center">
          Already have an account?{" "}
          <Link to={"/log-in"} className="underline text-blue-600">
            Log in
          </Link>
        </div>
      </div>
    </>
  );
}
