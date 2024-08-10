/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import useSetUser from "../../utils/setUser";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   const { setUser }= useContext(AuthContext);
  const setUser = useSetUser();

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission logic
    const loginStatus = true;

    if (loginStatus) {
      setUser(data);
      localStorage.setItem("userData", JSON.stringify(data));

      // Optionally, you can redirect the user or show a success message
      console.log("User data saved in localStorage");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Logged In",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } else {
      Swal.fire({
        title: " Login Error!",
        text: " User Does Not Exist!!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen     bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="username"
            >
              Password
            </label>
            <input
              type="text"
              id="username"
              {...register("password", { required: "Username is required" })}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder="Enter your username"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
