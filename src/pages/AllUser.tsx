import React, { useEffect } from "react";
import { useGetAllUserQuery } from "../app/user/userApi";
import toast from "react-hot-toast";

type AllUserProps = {};

const AllUser: React.FC<AllUserProps> = () => {
  const { data, error, isLoading } = useGetAllUserQuery({}, {});
  useEffect(() => {
    // Handle login state here with isSuccess, isError, error, isLoading

    if (data) {
      toast.success(data.message, {
        id: "user-success",
      });
    }

    if (error) {
      if ("message" in error && error.message) {
        toast.error(error.message, {
          id: "user-error",
        });
      } else {
        toast.error("An error occurred", {
          id: "user-error",
        });
      }
    }

    if (isLoading) {
      toast.loading("Loading...", {
        id: "user-loading",
      });
    }

    return () => {
      toast.dismiss("user-success");
      toast.dismiss("user-error");
      toast.dismiss("user-loading");
    };
  }, [data, error, isLoading]);

  let content;
  if (data?.data?.length === 0) {
    content = (
      <div>
        <h3>User Not Found</h3>
      </div>
    );
  }

  console.log(data?.data);

  if (data?.data?.length > 0) {
    // console.log(data.data[0].verified);
    content = data.data.map((user: any) => (
      <tr>
        <td className="p-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
              <img
                className="rounded-full"
                src={user.image}
                width={40}
                height={40}
                alt="Alex Shatov"
              />
            </div>
            <div className="font-medium text-gray-800">{user.name}</div>
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left">{user.email}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left font-medium text-green-500">
            {user.role}
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-center font-medium text-green-500">
            {user._id}
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-sm font-normal text-center">
            {user.verified ? (
              <span className="bg-green-600 text-white rounded-xl px-3 py-1">
                True
              </span>
            ) : (
              <span className="bg-red-600 text-white rounded-xl px-3 py-1">
                False
              </span>
            )}
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <section className=" antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
      <div className="">
        <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Customers</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Email</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Role</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">id</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">verified</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AllUser;
