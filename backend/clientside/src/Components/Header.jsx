import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSignOutMutation } from "../Redux/Auth/authApiSlice";
import { setCurrentUser, logOut } from "../Redux/Auth/authSlice";

function Header() {
  const [show, setShow] = useState(false);
  const [signOut] = useSignOutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userEmail = useSelector(setCurrentUser);
  // console.log(userEmail);

  const logOutUser = async () => {
    await signOut().unwrap();
    dispatch(logOut());
    navigate("/")
  };

  return (
    <>
      <div>
        <div className=" bg-gradient-to-r from-blue-500 to-blue-600 px-4 shadow-md">
          <nav className="2xl:container 2xl:mx-auto sm:py-6 sm:px-7 py-4 px-4">
            {/* For large and Medium-sized Screen */}
            <div className="flex justify-between ">
              <Link to={"/"}>
                <div className="font-bold text-3xl">
                  <span className="text-white">TM</span>
                  <span className="text-white">NOTES</span>
                </div>
              </Link>

              {!userEmail ? (
                <div className="hidden sm:flex flex-row space-x-4 justify-center items-center">
                  <Link to="/register">
                    <button className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-white bg-transparent border border-white focus:outline-none hover:bg-white hover:text-blue-800 duration-150 justify-center items-center focus:text-white focus:bg-transparent">
                      Sign Up
                    </button>
                  </Link>

                  <Link to="/login">
                    <button className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-white bg-transparent border border-white  hover:text-blue-800 hover:bg-white duration-150 justify-center items-center focus:text-white focus:bg-transparent">
                      Login
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="hidden sm:flex flex-row space-x-4 justify-center items-center">
                  <span className="mr-2 text-white">
                    {/* Hello, {userdata.name.split(" ")[0]} */}
                    {userEmail}
                  </span>
                  <button
                    onClick={logOutUser}
                    className="px-4 py-2 text-blue-100 bg-transparent border border-white rounded-md hover:bg-gray-200 hover:text-blue-800 focus:text-white focus:bg-transparent"
                  >
                    Log out
                  </button>{" "}
                </div>
              )}

              {/* Burger Icon */}
              <div
                id="bgIcon"
                onClick={() => setShow(!show)}
                className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white  justify-center items-center sm:hidden cursor-pointer`}
              >
                <svg
                  className={`${show ? "hidden" : ""}`}
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className=" transform duration-150"
                    d="M4 6H20"
                    stroke="#F2F2F2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 12H20"
                    stroke="#F2F2F2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    className=" transform duration-150"
                    d="M4 18H20"
                    stroke="#F2F2F2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  className={`${show ? "block" : "hidden"}`}
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="#F2F2F2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="#F2F2F2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* Mobile and small-screen devices (toggle Menu) */}
            <div
              id="MobileNavigation"
              className={`${show ? "block" : "hidden"} sm:hidden mt-4 mx-auto`}
            >
              {!userEmail ? (
                <div className="flex flex-col gap-4 mt-4 w-80 mx-auto ">
                  <Link to="/register">
                    <button className="rounded-md flex space-x-2 w-full h-10 font-normal text-sm leading-3 text-white bg-transparent border-white focus:outline-none focus:bg-white justify-center items-center focus:text-white focus:bg-transparent">
                      Sign Up
                    </button>
                  </Link>

                  <Link to="/login">
                    <button className="rounded-md flex space-x-2 w-full h-10 font-normal text-sm leading-3 text-white bg-transparent focus:outline-none focus:ring-white focus:bg-white  justify-center items-center focus:text-white focus:bg-transparent">
                      Sign In
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col text-white gap-4 mt-4 w-80 mx-auto ">
                  <span className="mr-2 text-center">
                    {/* Hello, {userdata.name.split(" ")[0]} */}
                    {userEmail}
                  </span>

                  <button
                    onClick={logOutUser}
                    className="rounded-md flex space-x-2 w-full h-10 font-normal text-sm leading-3 text-white bg-transparent border-white focus:outline-none focus:bg-gray-200 focus:text-blue-800 justify-center items-center"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

      </div>
    </>
  );
}

export default Header;
