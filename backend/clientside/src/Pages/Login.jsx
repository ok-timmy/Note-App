import React, { useState, useContext } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Register from "./Register";
import { UserContext } from "../UserContext";
// import { axiosInstance } from "../config";
import axios from "axios";
import { useEffect } from "react";

function Login() {
  const {login} = useContext(UserContext);
  const [details, setDetails] = useState({email:"", password: ""});
  const [error,setError] = useState(false);
  const navigate = useNavigate()
  
  function handleChange(evt) {
    const {name, value} = evt.target;
    setDetails((prev)=>({
      ...prev,
      [name]: value,
    }));
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(
        "http://localhost:5000/api/auth/login",
        details
      );
      if (user.data) {
        // loginChange(user.data);
        console.log("We got Users");
        localStorage.setItem('user', JSON.stringify(user.data))
        navigate("/notes");
      login(user.data);
      }
    } catch (error) {
      console.log(error.status);
      setError(true)
    }
  };

  return (
    <div className="flex items-center justify-center xs:h-auto xs:py-12  bg-gray-100">
      <div className="px-8 py-6 xs:min-w-[100vw] sm:min-w-[50vw] text-left bg-white shadow-lg ">
        <h3 className="text-5xl font-semibold text-center">Sign In</h3>
        <form action="">
          <div className="mt-4">
            <div>
              <label className="block text-2xl" htmlFor="email">
                Email
              </label>
              <input
                type="text"
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
                name="password"
                placeholder="Password"
                required="required" 
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 hover:cursor-pointer"
              >
                Login
              </button>
              

              <Link to="/register">
                <button className="px-6 py-2 mt-4 text-blue bg-white-600 rounded-lg hover:bg-gray-300">
                  Register
                </button>
              </Link>
            </div>
            {error ? <span id='message' className="text-md pt-6 text-red-400">Incorrect Username or Password</span> : null}
          </div>
        </form>
      </div>
      <Routes>
        <Route path="/register/*" element={<Register />} />
      </Routes>
    </div>
  );
}

export default Login;
