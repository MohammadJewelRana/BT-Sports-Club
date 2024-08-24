/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import Heading from "../../Layout/Heading";

import Swal from "sweetalert2";

interface FormData {
  subject: string;
  description: string;
}

const AddNotice = ({ refetch }: any) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const {
    register,

    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // console.log(data);
    // Handle form submission

    fetch("https://bt-sports-backend.vercel.app/api/notice/create-notice", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          // refetch();
          // noticeRefetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Notice created successfully!!",
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

  return (
    <div>
      <Heading heading={"Add Notice"} />

      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {isFormVisible ? "Close Form" : "Add Notice"}
          </button>
        </div>

        {isFormVisible && (
          <div className="bg-white p-6 shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Add Notice</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Notice Subject
                </label>
                <input
                  type="text"
                  {...register("subject", {
                    required: "Notice subject is required",
                  })}
                  placeholder="Enter notice subject"
                  className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                />
                {errors.subject && (
                  <p className="text-red-500 mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Details</label>
                <textarea
                  {...register("description", {
                    required: "Details are required",
                  })}
                  placeholder="Enter notice details"
                  className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                  rows={5}
                />
                {errors.description && (
                  <p className="text-red-500 mt-1">
                    {errors.description.message}
                  </p>
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

      {/* <div className="mt-12">
        <HeadingWithSubheading
          heading={"  all Notice"}
          subheading={"All  important notice information "}
        ></HeadingWithSubheading>

        <ShowNotice  ></ShowNotice>
      </div> */}
    </div>
  );
};

export default AddNotice;
