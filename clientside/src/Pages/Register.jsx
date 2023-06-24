import React, { useState, useRef, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useRegisterMutation } from "../Redux/Auth/authApiSlice";

function Register() {
  const [details, setDetails] = useState({name: "", email: "", password: "", password2: ""});
  const [nameerror, setNameerror] = useState(false);
  const [passworderror, setPassworderror] = useState(false);
  const [emailerror, setEmailerror] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const nameRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();
  const [register, { isLoading }] =
    useRegisterMutation();
    const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setDetails({
      ...details,
      [name]: value,
    });
  }

  function checkPassword() {
    const pass = document.getElementById("password").value;
    const passConfirm = document.getElementById("password2").value;

    if (pass === passConfirm) {
      document.getElementById("message").classList.remove("text-red-400");
      document.getElementById("message").classList.add("text-green-400");
      document.getElementById("message").innerText = "Password Matched!!";
    } else {
      document.getElementById("message").innerText =
        "Password Does Not Match!!";
    }
  }

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setEmailerror(false);
    setNameerror(false);
    setPassworderror(false);
  }, [details]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let nameerr, passworderr, emailerr;
    !details.hasOwnProperty("name") && (nameerr = true) && setNameerror(true);
    !details.hasOwnProperty("password") &&
      (passworderr = true) &&
      setPassworderror(true);
    !details.hasOwnProperty("email") &&
      (emailerr = true) &&
      setEmailerror(true);
    console.log(nameerror);
    if (emailerr || nameerr || passworderr) {
      // console.log(emailerr, nameerr, passworderr);
      return;
    } else {
      try {
        const { password2, ...userDetails} = details
         await register({ ...userDetails }).unwrap();
         setDetails({
          name: "",
          email: "",
          password: "",
          password2: ""
         });
         navigate("/login")

      } catch (err) {
       setErrorMessage(err.data.message)
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center xs:h-auto md:py-12  md:min-h-screen xs:px-12 bg-gray-100">
        <div className="px-8 py-6 mx-4 md:my-4 text-left bg-white shadow-lg xs:min-w-[100vw] sm:min-w-[50vw] md:min-w-[30vw] md:rounded-lg">
          <h3 className="md:text-5xl xs:text-3xl font-bold text-center mb-12">
            Register
          </h3>
          <form action="">
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="Name">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  required="required"
                  value={details.name}
                  ref={nameRef}
                  className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${nameerror ===true && "outline-none ring-1 ring-red-500 " }`}
                />
                {nameerror ? (
                  <span className="text-xs text-red-400">
                    Field Cannot be Empty!
                  </span>
                ) : null}
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  required="required"
                  ref={emailRef}
                  value={details.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${emailerror ===true && "outline-none ring-1 ring-red-500 " }`}
                />
                {emailerror ? (
                  <span className="text-xs text-red-400">
                    Field Cannot be Empty!
                  </span>
                ) : null}
                {errorMessage && <div id="message" className="text-xs text-red-400">{errorMessage}</div>}
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  required="required"
                  ref={pwdRef}
                  value={details.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${passworderror ===true && "outline-none ring-1 ring-red-500 " }`}
                />
                {passworderror ? (
                  <span className="text-xs text-red-400">
                    Field Cannot be Empty!
                  </span>
                ) : null}
              </div>
              <div className="mt-4">
                <label className="block">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password2"
                  name="password2"
                  required="required"
                  value={details.password2}
                  onChange={handleChange}
                  onKeyUp={checkPassword}
                  className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${passworderror ===true && "outline-none ring-1 ring-red-500 " }`}
                />
              </div>
              <span id="message" className="text-xs text-red-400"></span>
              
              <div className="flex">
                <button
                  className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                  onClick={handleSubmit}
                >
                  {isLoading? "Loading..." : "Create Account"}
                </button>
              </div>
              <div className="md:mt-6 text-grey-dark">
                Already have an account?
                <Link to="/login">
                  {" "}
                  <button className="px-6 py-2 mt-4 text-blue bg-white-600 rounded-lg hover:bg-gray-300">
                    Login
                  </button>
                </Link>
              </div>
            </div>
            <Routes>
              <Route path="/login/*" element={<Login />} />
            </Routes>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
