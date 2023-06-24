import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Redux/Auth/authSlice";
import { useLoginMutation } from "../Redux/Auth/authApiSlice";

function Login() {

  const userRef = useRef();
  const pwdRef = useRef();
  const errorRef = useRef();
  const [details, setDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [details]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(Boolean(error))
    try {
      const { email, password } = details;
      const userData = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...userData }));
      setDetails({
        email: "",
        password: "",
      });
      // console.log(userData)
      navigate("/notes");
    } catch (error) {
      if (!error?.status) {
        setError("No Server Response");
      } else if (error?.status === 400) {
        if(!details.email) {
          setError("Missing Username");
          userRef.current.focus()
        } else if (!details.password) {
          setError("Missing Password");
          pwdRef.current.focus()
        }
        else if(!details.email && !details.password){
          setError("Missing Username and Password");
          userRef.current.focus();
        }

        else {
          setError("Incorrect Username Or Password");
          userRef.current.focus();
        }

      } else if (error.status === 401) {
        setError("Unathorized");
      } else {
        setError("Login Failed");
      }
      errorRef.current.focus();
    }
  };

  return (
    <div className="flex items-center justify-center xs:h-auto md:py-12  bg-gray-100">
      <div className="px-8 py-6 xs:min-w-[100vw] sm:min-w-[50vw] md:min-w-[30vw] md:rounded-md text-left bg-white shadow-lg ">
        <h3 className="md:text-5xl font-semibold font-sans text-center xs:text-3xl">
          Sign In
        </h3>

       
        <form action="">
          <div className="mt-4">
            <div>
              <label className="block text-2xl" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                ref={userRef}
                onChange={handleChange}
                name="email"
                placeholder="Email"
                required={true}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="mt-4">
              <label className="block text-2xl" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                onChange={handleChange}
                ref={pwdRef}
                name="password"
                placeholder="Password"
                required="required"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-baseline justify-between">
              {isLoading ? (
                <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900  disabled:cursor-not-allowed">
                  Loading
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 hover:cursor-pointer"
                >
                  Login
                </button>
              )}

              <Link to="/register">
                <button className="px-6 py-2 mt-4 text-blue bg-white-600 rounded-lg hover:bg-gray-300">
                  Register
                </button>
              </Link>
            </div>
            {error ? (
              <span id="message" className="text-md pt-6 text-red-400" ref={errorRef}>
                {error}
              </span>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
