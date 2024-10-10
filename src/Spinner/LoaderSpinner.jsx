import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function LoaderSpinner({ isLoading, status, onClick }) {

  return (
    <button
      className={`text-white rounded-xl w-20 py-1 ${
        isLoading? "bg-white text-gray-800": status === 1? "bg-green-600": "bg-red-600"}`
      }
            onClick={onClick}
            disabled={isLoading}
    >
      {isLoading? (
        <ClipLoader size={30} color="gray" />
      ) : status === 1 ? (
        "Active"
      ) : (
        "Inactive"
      )}
    </button>
  );
}
