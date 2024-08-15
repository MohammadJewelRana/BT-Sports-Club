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

  const onSubmit = async (data: any) => {
    console.log(data);
    // Handle form submission logic

    // const loginStatus = true;
    try {
      const response = await fetch(
        "https://bt-sports-backend.vercel.app/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // Handle success
        const result = await response.json();
        console.log("Login successful:", result);
        setUser(data);
        localStorage.setItem("userData", JSON.stringify(data));
        Swal.fire({
          title: "Success!",
          text: "You have logged in successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to log in. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    // if (loginStatus) {
    //   setUser(data);
    //   localStorage.setItem("userData", JSON.stringify(data));

    //   // Optionally, you can redirect the user or show a success message
    //   console.log("User data saved in localStorage");
    //   Swal.fire({
    //     position: "top-end",
    //     icon: "success",
    //     title: "Successfully Logged In",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    //   navigate("/");
    // } else {
    //   Swal.fire({
    //     title: " Login Error!",
    //     text: " User Does Not Exist!!",
    //     icon: "error",
    //     confirmButtonText: "Try Again",
    //   });
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen     bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2 capitalize"
              htmlFor="username"
            >
              whatsapp number
            </label>
            <input
              type="text"
              id="username"
              {...register("whatsapp", { required: "Username is required" })}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              placeholder="Enter your whatsapp number"
            />
            {errors.whatsapp && (
              <p className="text-red-500 text-sm mt-1">
                {errors.whatsapp.message as string}
              </p>
            )}
          </div>

          {/* 
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
          </div> */}

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
