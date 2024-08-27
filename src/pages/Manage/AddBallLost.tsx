/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import Heading from "../../Layout/Heading";
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";
import LoadingPage from "../Shared/LoadingPage";

interface FormData {
  date: string;
  name: string; // This will store both id and name as a single string
  lostBallCount: number;
}

const AddBallLost = ({ refetch }: any) => {
  const [userAll, allUserLoading] = useUser();
  const userData = userAll?.data;
  
  const [isFormVisible, setIsFormVisible] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);

    // Split the value into id and name
    const [id, name] = data.name.split("|");

    const lostBallCount = Number(data.lostBallCount);
    const newData = { id, name, lostBallCount, lostDate: data.date };
    console.log(newData);

    // Handle form submission
    fetch("https://bt-sports-backend.vercel.app/api/notice/ball-lost/create-ballLost", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Ball lost created successfully!!",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          refetch();
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Do you want to continue",
          icon: "error",
          confirmButtonText: "Cool",
        });
      });
  };
  if(allUserLoading){
    return <LoadingPage></LoadingPage>
  }

  return (
    <div>
      <Heading heading={"Ball lost list"} />

      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {isFormVisible ? "Close Form" : "Add Ball Lost "}
          </button>
        </div>

        {isFormVisible && (
          <div className="bg-white p-6 shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Add Ball Lost List</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <select
                  {...register("name", { required: "Name is required" })}
                  className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                >
                  <option value="">Select name</option>
                  {userData?.map((user: any) => (
                    <option key={user._id} value={`${user._id}|${user.name}`}>
                      {user.name}
                    </option>
                  ))}
                </select>
                {errors.name && (
                  <p className="text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="mb-6 w-full">
                <label htmlFor="profession" className="block mb-2 ml-1">
                  Ball Lost Count:
                </label>
                <select
                  className="border w-full px-3 py-2 rounded-lg text-black bg-white"
                  {...register("lostBallCount", {
                    required: "Ball count is required",
                  })}
                >
                  <option value="">Select Number</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                {errors.lostBallCount && (
                  <span className="mt-1 text-red-600 block">
                    {errors.lostBallCount.message}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  {...register("date", {
                    required: "Date is required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                />
                {errors.date && (
                  <p className="text-red-500 mt-1">{errors.date.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBallLost;
