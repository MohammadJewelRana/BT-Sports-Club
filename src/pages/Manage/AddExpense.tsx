/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable use-isnan */
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Heading from "../../Layout/Heading";

interface FormData {
  buyer: string;
  numberOfBall: string;
  ballCost: number;
  numberOfTape: string;
  tapeCost: number;
  buyDate: string; // Date in ISO 8601 format
}

const AddExpense = ({ refetch }: any) => {
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
    const formattedDate = formatDateToISO(data.buyDate);
    // console.log(data);
    data.buyDate = formattedDate;
    // console.log(data);
    const { buyer, buyDate } = data;

    const newData = {
      buyer,
      numberOfBall: parseInt(data.numberOfBall, 10),
      ballCost: isNaN(data.ballCost) ? 0 : data.ballCost,
      numberOfTape: parseInt(data.numberOfTape, 10),
      tapeCost: isNaN(data.tapeCost) ? 0 : data.tapeCost,
      buyDate,
    };
    console.log(newData);

    fetch("https://bt-sports-backend.vercel.app/api/campaign/expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Expense added successfully!",
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
          text: "Failed to add expense. Please try again.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <div>
      <Heading heading={"Add Expense"} />

      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {isFormVisible ? "Close Form" : "Add Expense"}
          </button>
        </div>

        {isFormVisible && (
          <div className="bg-white p-6 shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Buyer</label>
                <input
                  type="text"
                  {...register("buyer", {
                    required: "Buyer name is required",
                  })}
                  placeholder="Enter buyer name"
                  className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                />
                {errors.buyer && (
                  <p className="text-red-500 mt-1">{errors.buyer.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Number of Ball & Ball Cost
                </label>
                <div className="flex space-x-4">
                  <select
                    {...register("numberOfBall", {
                      required: "Number of balls is required",
                    })}
                    className="w-1/2 p-2 border border-gray-300 rounded bg-white text-black"
                  >
                    <option value="">Select number of balls</option>
                    <option value="0">0 Ball</option>
                    <option value="1">1 Ball</option>
                    <option value="2">2 Balls</option>
                    <option value="3">3 Balls</option>
                    <option value="4">4 Balls</option>
                    <option value="5">5 Balls</option>
                  </select>

                  <input
                    type="number"
                    {...register("ballCost", {
                      valueAsNumber: true,
                    })}
                    placeholder="Enter ball cost"
                    className="w-1/2 p-2 border border-gray-300 rounded bg-white text-black"
                  />
                </div>
                {errors.numberOfBall && (
                  <p className="text-red-500 mt-1">
                    {errors.numberOfBall.message}
                  </p>
                )}
                {errors.ballCost && (
                  <p className="text-red-500 mt-1">{errors.ballCost.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Number of Tape & Tape Cost
                </label>
                <div className="flex space-x-4">
                  <select
                    {...register("numberOfTape", {
                      required: "Number of tapes is required",
                    })}
                    className="w-1/2 p-2 border border-gray-300 rounded bg-white text-black"
                  >
                    <option value="">Select number of tapes</option>
                    <option value="0">0 Tape</option>
                    <option value="1">1 Tape</option>
                    <option value="2">2 Tapes</option>
                    <option value="3">3 Tapes</option>
                    <option value="4">4 Tapes</option>
                    <option value="5">5 Tapes</option>
                  </select>

                  <input
                    type="number"
                    {...register("tapeCost", {
                      valueAsNumber: true,
                    })}
                    placeholder="Enter tape cost"
                    className="w-1/2 p-2 border border-gray-300 rounded bg-white text-black"
                  />
                </div>
                {errors.numberOfTape && (
                  <p className="text-red-500 mt-1">
                    {errors.numberOfTape.message}
                  </p>
                )}
                {errors.tapeCost && (
                  <p className="text-red-500 mt-1">{errors.tapeCost.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Buy Date</label>
                <input
                  type="date"
                  {...register("buyDate", {
                    required: "Buy date is required",
                  })}
                  className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                />
                {errors.buyDate && (
                  <p className="text-red-500 mt-1">{errors.buyDate.message}</p>
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

export default AddExpense;
