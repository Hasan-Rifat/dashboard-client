import React, { useState, useEffect, useRef } from "react";
import { useAppSelector } from "../../app/hooks";

type UserCardProps = {};

const UserCard: React.FC<UserCardProps> = () => {
  const { role, email, image, name, verified } = useAppSelector(
    (state) => state.user
  );
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !(dropdownRef.current as HTMLDivElement).contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  // Add click event listener to the document
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(verified);

  return (
    <section>
      {!verified && (
        <p className="text-center text-xl font-medium bg-red-400 text-white p-2 my-2">
          please check email and very your account{" "}
        </p>
      )}
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4 relative">
          <button
            onClick={() => setOpen(!open)}
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
          {/* Dropdown menu */}
          <div className="absolute" ref={dropdownRef}>
            {open && (
              <div
                className={`z-10 ${
                  open ? "block" : "hidden"
                } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              >
                <ul className="py-2">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Edit
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={image}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {name}
          </h5>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {email}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {role}
          </span>
        </div>
      </div>
    </section>
  );
};

export default UserCard;
