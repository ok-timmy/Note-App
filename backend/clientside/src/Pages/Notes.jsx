import React, { useEffect, useState } from "react";
import Note from "../Components/Note";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetnotesQuery } from "../Redux/Notes/noteApiSlice";
// import { setAllNote } from "../Redux/Notes/noteSlice";
import AddNote from "../Images/Add-Note.svg";
import { setCurrentUser } from "../Redux/Auth/authSlice";

function Notes() {
  const [changeOccured, setChangeOccured] = useState(false);
  const user = useSelector(setCurrentUser);
  // console.log(user);

  const { data: usersNote, isLoading, isError } = useGetnotesQuery(user);
  // console.log(usersNote, isLoading, isSuccess, isError);


  if (isLoading) {
    return (
      <div className="flex flex-col justify-center my-16">
        <div className="mx-auto" role="status">
          <svg
            className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else if (isError) {
    return (
      <div className="container mx-auto md:px-12 xs:px-4">
        <div className="text-center">
          {" "}
          Sorry, We Could not fetch Your Notes. Please try Again
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        {usersNote?.length ? (
          <div className="container mx-auto md:px-12 xs:px-4">
            <div className="">
              <Link to="/newnote">
                <button className=" px-4 py-2 text-white bg-blue-600 hover:bg-blue-800 mt-6 rounded-lg">
                  Create Note
                </button>
              </Link>
            </div>
            <div className="">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 pt-5 pb-10 lg:pt-10 lg:pb-20">
                {usersNote.map((mynote) => {
                  return (
                    <Note
                      key={mynote._id}
                      mynote={mynote}
                      changeOccured={changeOccured}
                      setChangeOccured={setChangeOccured}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col align-middle px-20 py-20 min-h-96 items-center">
            <div className="xs:w-64 xs:h-64 md:w-96 md:h-96 mx-auto">
              <img src={AddNote} alt="addnote" />
            </div>
            <h2 className="text-3xl align-middle">
              Create Your First <span className="text-blue-800"> Note </span>
            </h2>
            <div className=" mx-auto my-6">
              <Link to="/newnote">
                <button className="text-lg px-6 py-3 text-white bg-blue-600 hover:bg-blue-900 rounded-lg">
                  Create Note
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Notes;
