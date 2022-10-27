import React from "react";
import { Link } from "react-router-dom";
import MobileNote from "../Images/Mobile-Note.svg";

function Home() {
  return (
    <div>
      <main className="h-auto mx-auto px-4 xs:my-24 sm:px-6 lg:my-20 lg:px-10 xl:my-28">
        <div className=" mx-auto text-center  lg:w-max">
          <h1 className="text-7xl tracking-tight font-extrabold text-gray-900 xs:text-5xl sm:text-5xl md:text-7xl">
            <span className=" inline">
              Every Great Idea Started as a
            </span>
            <span className=" text-blue-600 inline"> Note</span>
          </h1>
          <p className="mt-3 text-base text-gray-800 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-2xl">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className="mt-5 sm:mt-8 ">
            <div className="rounded-md">
              <Link to="/login">
                <button className="text-lg px-6 py-3 text-white bg-blue-600 hover:bg-blue-900 rounded-lg">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <div className="grid grid-cols-2 xs:grid-cols-1 xs:px-6 px-12 py-8 mx-auto align-middle bg-slate-50">
        <div className="flex flex-col justify-center place-content-start">
          <div className="text-5xl xs:text-3xl text-blue-800 font-bold">
            Benefits Of Keeping Track Of Your Notes
          </div>
          <div className="flex flex-col justify-evenly h-96 xs:h-64">
            <div className="flex"><i className="fa fa-check-square text-2xl text-blue-800" aria-hidden="true"></i><p className="text-black text-2xl ml-2">Engages your mind</p></div>
            <div className="flex"><i className="fa fa-check-square text-2xl text-blue-800" aria-hidden="true"></i><p className="text-black text-2xl ml-2">Emphasizes and organizes information</p></div>
            <div className="flex"><i className="fa fa-check-square text-2xl text-blue-800" aria-hidden="true"></i><p className="text-black text-2xl ml-2">Creates a condensed record for study.</p></div>
            <div className="flex"><i className="fa fa-check-square text-2xl text-blue-800" aria-hidden="true"></i><p className="text-black text-2xl ml-2">Keeps you alert</p></div>
          </div>
        </div>
        <div
          className="flex justify-start align-top"
          style={{ width: "auto", height: "40rem" }}
        >
          {/* Image Section */}
          <img
            src={MobileNote}
            alt={"mobile-note"}
            width={"100%"}
            height={"100%"}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
