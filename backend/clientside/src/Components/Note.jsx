import React, { useState } from "react";
// import { axiosInstance } from '../config';
import axios from "axios";

function Note({ mynote }) {
  const [updatemode, setUpdateMode] = useState(false);

  function refresh() {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  const handleDelete = async () => {
    // confirm("Are You Sure You Want to Delete?")
    console.log(mynote);
    try {
      await axios
        .delete(`http://localhost:5000/api/${mynote._id}`)
        .then(refresh());
      console.log("Successfully deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const [title, setTitle] = useState(mynote.title);
  const [description, setDescription] = useState(mynote.description);
  const handleUpdate = () => {
    setUpdateMode(true);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/${mynote._id}`, {
        title,
        description,
      });
      window.location.reload();
    } catch (error) {}
  };

  const handleCancel = () => {
    setUpdateMode(false);
  };

  return (
    <>
      {updatemode ? (
        <div className=" bg-gray-100 rounded-lg">
          <div className="flex flex-col items-center shadow-md rounded-lg bg-white sm:justify-center sm:pt-0 ">
            <div className="mb-2">
              <h1 className="font-serif text-3xl">Edit Note</h1>
            </div>

            <div className="w-full px-2 py-4 bg-white rounded  ring-1 ring-gray-900/10">
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
                    className="block w-full py-3 px-3 mt-1  rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:outline-none focus:border-b focus:border-black focus:ring-opacity-50"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    name="title"
                    maxLength={30}
                    placeholder="30"
                  />
                </div>

                {/* <!-- Description --> */}
                <div className="mt-4">
                  <label
                    className="block text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    className="block w-full py-3 px-3 mt-1 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:outline-none focus:border-b focus:border-black focus:ring-opacity-50"
                    rows="5"
                    placeholder="400"
                    style={{ resize: "none" }}
                  ></textarea>
                </div>

                <div className="flex items-center justify-start mb-3 mt-5 gap-x-2">
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="px-4 py-2 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-blue-800 hover:bg-blue-600 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 text-sm font-semibold text-gray-100 bg-gray-400 rounded-md shadow-md hover:bg-red-800 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div key={mynote._id} className="p-6 bg-gray-300 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-2"> {mynote.title}</h3>

          <p className="text-lg leading-6 text-gray-800">
            {mynote.description}
          </p>

          <div className="flex items-baseline justify-end">
            <button
              onClick={handleUpdate}
              className="px-2 py-1 mt-4 mx-2 text-blue-800"
            >
              <i className="fa-regular fa-pen-to-square text-xl text-blue-700"></i>
            </button>
            <button
              onClick={handleDelete}
              className="px-2 py-1 mt-4 text-blue bg-white-600 rounded-lg hover:bg-gray-300"
            >
              <i className="fa-regular fa-trash-can text-red-700 text-xl"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Note;
