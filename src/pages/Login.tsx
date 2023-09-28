import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../app/user/userApi";
import toast from "react-hot-toast";

type LoginFormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginUser, { isLoading, isError, error, data }] =
    useLoginUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    // Handle login state here with isSuccess, isError, error, isLoading

    if (data) {
      toast.success(data.message, {
        id: "login-success",
      });
      navigate(from, { replace: true });
      window.location.reload();
    }

    if (error) {
      if ("message" in error && error.message) {
        toast.error(error.message, {
          id: "login-error",
        });
      } else {
        toast.error("An error occurred", {
          id: "login-error",
        });
      }
    }

    if (isLoading) {
      toast.loading("Loading...", {
        id: "login-loading",
      });
    }

    return () => {
      toast.dismiss("login-success");
      toast.dismiss("login-error");
      toast.dismiss("login-loading");
    };
  }, [data, isError, error, isLoading, navigate]);

  const onSubmit = (data: LoginFormData) => {
    // Handle form submission here
    loginUser(data);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`bg-gray-50 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-bg-blue-600 focus:border-bg-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="name@company.com"
                  required
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-bg-blue-600 focus:border-bg-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  required
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-bg-blue-600 hover:underline dark:text-primary-500"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
