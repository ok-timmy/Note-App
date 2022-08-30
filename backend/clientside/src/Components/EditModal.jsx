import axios from "axios";
import React, { useState } from "react";

const EditModal = ({handleEditMode, mynote}) => {

  const [title, setTitle] = useState(mynote.title);
  const [description, setDescription] = useState(mynote.description);
  
  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/${mynote._id}`, {
        title,
        description,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div
      className=" fixed w-max mx-auto right-0 top-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
            onClick={handleEditMode}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900">
              Edit Note
            </h3>
            <form className="space-y-6" action="#">
            <div>
                  <label
                    className="block text-sm font-bold text-gray-700"
                    htmlFor="title"
                  >
                    Title
                  </label>

                  <input
                    className="block w-full py-3 px-3 mt-1  rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:outline-none focus:border-b focus:border-b-black focus:ring-white focus:ring-opacity-50"
                    type="text"
                    autoComplete="off"
                    defaultValue={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    name="title"
                    maxLength={30}
                    placeholder="20"
                  />
                </div>

                <div className="mt-4">
                  <label
                    className="block text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    className="block w-full py-3 px-3 mt-1 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:outline-none focus:border-b focus:border-b-black  focus:ring-opacity-50"
                    rows="5"
                    placeholder="400"
                    maxLength={400}
                    style={{resize: "none"}}
                  ></textarea>
                </div>
              
              <button
              type="button"
              onClick={handleSubmit}
              className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleEditMode}
              className="text-gray-800 bg-white hover:bg-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
            >
              Discard Changes
            </button>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
