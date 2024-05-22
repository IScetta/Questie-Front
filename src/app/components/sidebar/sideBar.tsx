"use client";
import React from "react";

interface SideBarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ open, setOpen }) => {
  return (
    <>
      <div
        className={`${
          !open && "hidden"
        } bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`${
          open ? "w-80" : "w-0"
        } bg-purpleMainLight min-h-screen fixed top-0 left-0 transition-all duration-300 z-20`}
      >
        <div className={`${!open && "hidden"} pt-3`}>
          <button
            className="ml-4 text-white mb-14"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="text-center text-white text-xl hover:bg-purpleMain cursor-pointer py-3 mb-2">
            Home
          </div>
          <div className="text-center text-white text-xl hover:bg-purpleMain cursor-pointer py-3 mb-2">
            algo
          </div>
          <div className="text-center text-white text-xl hover:bg-purpleMain cursor-pointer py-3 mb-2">
            algo
          </div>
          <div className="text-center text-white text-xl hover:bg-purpleMain cursor-pointer py-3 mb-2">
            algo
          </div>
          <div className="text-center text-white text-xl hover:bg-purpleMain cursor-pointer py-3 mb-2">
            algo
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
