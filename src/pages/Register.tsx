import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useCreateUserMutation } from "../app/user/userApi";
import toast from "react-hot-toast";

type RegisterProps = {};

const Register: React.FC<RegisterProps> = () => {
  const navigate = useNavigate();
  const [createUser, { isLoading, isError, error, isSuccess, data }] =
    useCreateUserMutation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedImage, setSelectedImage] = useState<any>(null);

  const onSubmit = (data: any) => {
    // Handle form submission here, including the selectedImage file

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      if (fileReader.readyState === 2) {
        data.image = fileReader.result;
        data.role = "user";
        createUser(data);
      }
    };
    fileReader.readAsDataURL(selectedImage);
    reset();
    if (data) {
      navigate("/login");
    }
  };

  useEffect(() => {
    // Handle login state here with isSuccess, isError, error, isLoading

    if (data) {
      toast.success(data.message, {
        id: "user-create-success",
      });
    }

    if (error) {
      if ("message" in error && error.message) {
        toast.error(error.message, {
          id: "user-create-error",
        });
      }
    }

    if (isLoading) {
      toast.loading("Loading...", {
        id: "user-create-loading",
      });
    }

    return () => {
      toast.dismiss("user-create-success");
      toast.dismiss("user-create-error");
      toast.dismiss("user-create-loading");
    };
  }, [isSuccess, isError, error, isLoading]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedImage(file);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an Account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="name"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-bg-blue-600 focus:border-blue-bg-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      placeholder="Your name"
                      required
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">Name is required</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      id="email"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-bg-blue-600 focus:border-blue-bg-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="name@company.com"
                      required
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    Valid email is required
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      id="phone"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-bg-blue-600 focus:border-blue-bg-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                      placeholder="123-456-7890"
                      required
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">
                    Valid phone number is required
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-bg-blue-600 focus:border-blue-bg-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.image ? "border-red-500" : ""
                  }`}
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <p className="text-sm text-red-500">
                    Valid image is required
                  </p>
                )}
              </div>
              {selectedImage && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Selected Image:
                  </p>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="w-24 h-24 mt-2"
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="password"
                      id="password"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-bg-blue-600 focus:border-blue-bg-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                      placeholder="••••••••"
                      required
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">Password is required</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of Birth
                </label>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      id="dateOfBirth"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-bg-blue-600 focus:border-blue-bg-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        errors.dateOfBirth ? "border-red-500" : ""
                      }`}
                      required
                    />
                  )}
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-500">
                    Date of Birth is required
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-bg-blue-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
