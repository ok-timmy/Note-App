import React, { useState } from "react";
// import { axiosInstance } from "../config";
import axios from "axios";

function NewNote() {
  const [notedetails, setNotedetails] = useState({title: "", description: "", author: "" });
  const [isError, setisError] = useState(false);
  const [error, setError] = useState();

  const thisUser = localStorage.getItem("user");
  const thisVeryUser = JSON.parse(thisUser);
  if (thisVeryUser === null) {
    window.location.replace("/login");
  }
  const author = thisVeryUser.email;
  console.log(author);

  function handleChange(evt) {
    const {name, value} = evt.target;
    setNotedetails((prev)=>({
      ...prev,
      [name]: value,
      author
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotedetails(notedetails);

    try {

      const user = await axios.post(
        `http://localhost:5000/api/newnote/:${author}`,
        notedetails
      );
      if (!user.data) {
        setError("Problem Creating New Note");
        setisError(true);
      }
      window.location.replace("/notes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div className="flex flex-col items-center bg-gray-100 justify-center sm:pt-0">
          <div className="w-full sm:px-16 sm:py-20 xs:px-8 xs:pt-20 overflow-hidden xs:py-8 sm:h-max bg-white rounded-lg lg:max-w-4xl lg:my-4">
            <span className="text-red-500 text-[0.75rem]">
              {isError && error}
            </span>
            <div className="mb-4">
              <h1 className="font-serif text-4xl decoration-gray-400">
                Write Note
              </h1>
            </div>

            <div className="w-full px-6 py-4 bg-white rounded shadow-md ring-1 ring-gray-900/10">
              <form>
                {/* <!-- Title --> */}
                <div>
                  <label
                    className="block text-sm font-bold text-gray-700"
                    htmlFor="title"
                  >
                    Title
                  </label>

                  <input
                    className="block w-full py-3 px-3 mt-1  rounded-lg shadow-sm placeholder:text-gray-400 placeholder:text-right focus:outline-none focus:border-b focus:border-b-black focus:ring-white focus:ring-opacity-50"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    name="title"
                    maxLength={30}
                    placeholder="20"
                  />
                </div>

                {/* <!-- Description --> */}
                <div className="mt-4">
                  <label
                    className="block text-sm font-bold text-gray-700"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    onChange={handleChange}
                    className="block w-full py-3 px-3 mt-1 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:outline-none focus:border-b focus:border-b-black  focus:ring-opacity-50"
                    rows="5"
                    placeholder="400"
                    maxLength={400}
                    style={{ resize: "none" }}
                  ></textarea>
                </div>

                <div className="flex items-center justify-start mb-3 mt-5 gap-x-2">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-6 py-2 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-blue-800 hover:bg-blue-500 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
                  >
                    Create
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-sm font-semibold text-black bg-gray-200 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewNote;
