import { Link, Outlet, useNavigate } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { useLogoutUserMutation } from "../app/user/userApi";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userLogout } from "../app/user/userSlice";
import { useLoadUserQuery } from "../app/api/apiSlice";
const MainLayout = () => {
  const { role } = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const [logoutUser, { isLoading, isError, error, isSuccess }] =
    useLogoutUserMutation();
  const {} = useLoadUserQuery(
    {},
    {
      skip: !document.cookie ? true : false,
    }
  );

  const dispatch = useAppDispatch();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Add state for sidebar

  const menu = useRef(null);

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      menu.current &&
      !(menu.current as HTMLDivElement).contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

  // Add click event listener to the document
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logOut = async () => {
    await logoutUser({});
    dispatch(userLogout());
    navigate("/login");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("LogOut success", {
        id: "LogOut-success",
      });
    }

    if (error) {
      if ("message" in error && error.message) {
        toast.error(error.message, {
          id: "LogOut-error",
        });
      }
    }

    if (isLoading) {
      toast.loading("Loading...", {
        id: "LogOut-loading",
      });
    }

    return () => {
      toast.dismiss("LogOut-success");
      toast.dismiss("LogOut-error");
      toast.dismiss("LogOut-loading");
    };
  }, [isSuccess, isError, error, isLoading]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        ref={menu}
        id="separator-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        {/* Sidebar content */}
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to=""
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>

            {role === "admin" && (
              <>
                <li>
                  <Link
                    to="/all-user"
                    className="flex items-center  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <div className="p-1">
                      <AiFillFileAdd size={30} />
                    </div>
                    <span className="flex-1 whitespace-nowrap">ALL USER</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-user"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      ADD USER
                    </span>
                  </Link>
                </li>
              </>
            )}
            <li>
              <button
                onClick={() => logOut()}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <div className="">
                  <IoMdLogOut size={30} />
                </div>
                <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with responsive sidebar toggle */}
        <header className="bg-primary py-4 px-6 sm:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="text-gray-900 dark:text-white hover:text-gray-400 focus:outline-none focus:text-gray-400"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isSidebarOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-900">
          <div className="p-4 sm:ml-64 bg-primary">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
