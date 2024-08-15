/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import Heading from "../../Layout/Heading";
import Swal from "sweetalert2";

interface FormData {
  purpose: string;
  date: string; // Date in ISO 8601 format
}

const AddCampaign = ({ refetch }: any) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const formatDateToISO = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  const onSubmit = (data: FormData) => {
    // Convert the date to ISO 8601 format
    const formattedDate = formatDateToISO(data.date);

    fetch("https://bt-sports-backend.vercel.app/api/campaign/create-campaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        endDate: formattedDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Campaign created successfully!!",
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
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <div>
      <Heading heading={"Add Campaign"} />

      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {isFormVisible ? "Close Form" : "Add Campaign"}
          </button>
        </div>

        {isFormVisible && (
          <div className="bg-white p-6 shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Add Campaign</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Purpose</label>
                <input
                  type="text"
                  {...register("purpose", {
                    required: "Campaign purpose is required",
                  })}
                  placeholder="Enter campaign purpose"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.purpose && (
                  <p className="text-red-500 mt-1">{errors.purpose.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  {...register("date", {
                    required: "Date is required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded"
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

export default AddCampaign;
