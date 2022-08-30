import React, { useState } from "react";
// import { axiosInstance } from '../config';
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

function Note({ mynote }) {

  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleEditMode = () => {
    setEditMode(!editMode);
  }

  const handleConfirmDelete =() => {
    setConfirmDelete(!confirmDelete);
  }

  return (
    <>
        <div key={mynote._id} className="p-6 bg-gray-300 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-2"> {mynote.title}</h3>

          <p className="text-lg leading-6 text-gray-800">
            {mynote.description}
          </p>

          <div className="flex items-baseline justify-end">
            <button
              className="px-2 py-1 mt-4 mx-2 text-blue-800"
              type="button"
              onClick={handleEditMode}
            >
              <i className="fa-regular fa-pen-to-square text-xl text-blue-700"></i>
            </button>
            {editMode && <EditModal handleEditMode={handleEditMode} mynote={mynote}/>}
            
            <button
              onClick={handleConfirmDelete}
              className="px-2 py-1 mt-4 text-blue bg-white-600 rounded-lg hover:bg-gray-300"
            >
              <i className="fa-regular fa-trash-can text-red-700 text-xl"></i>
            </button>
            {confirmDelete  && <DeleteModal handleConfirmDelete={handleConfirmDelete} mynote={mynote}/>}
          </div>
        </div>
    </>
  );
}

export default Note;
