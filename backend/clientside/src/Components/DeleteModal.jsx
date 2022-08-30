import axios from "axios";
import React from "react";

const DeleteModal = ({ handleConfirmDelete, mynote }) => {
  function refresh() {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  const handleDelete = async () => {
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


  return (
    <div className="fixed w-max mx-auto right-0 top-0 left-0 z-50 md:inset-0 h-modal md:h-full">
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
            onClick={handleConfirmDelete}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 w-14 h-14 text-gray-400 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete this note?
            </h3>
            <button
              type="button"
              onClick={handleDelete}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
