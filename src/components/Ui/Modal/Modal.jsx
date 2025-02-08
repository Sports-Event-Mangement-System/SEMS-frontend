import React, { useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";

export default function Modal({ closeModal, children, size = "large" }) {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const sizeClasses = {
    small: "w-[30%] py-6 px-10",
    large: "w-[50%] py-10 px-20",
    "extra-large": "w-[70%] py-12 px-24",
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 rounded-lg h-fit z-50 ${
          sizeClasses[size] || sizeClasses.large
        }`}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-md text-gray-500 hover:bg-gray-200 transition-colors duration-200"
        >
          <RiCloseFill className="h-8 w-8" />
        </button>
        {children}
      </div>
    </>
  );
}
