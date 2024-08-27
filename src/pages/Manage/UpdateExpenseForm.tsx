 /* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface FormData {
  buyer: string;
  numberOfBall: string;
  ballCost: number;
  numberOfTape: string;
  tapeCost: number;
  buyDate: string; // Date in ISO 8601 format
}

const UpdateExpenseForm = ({ expense, onClose, onSuccess }: any) => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      buyer: expense.buyer,
      numberOfBall: String(expense.numberOfBall),
      ballCost: expense.ballCost,
      numberOfTape: String(expense.numberOfTape),
      tapeCost: expense.tapeCost,
      buyDate: expense.buyDate.slice(0, 10), // Set default value for date input
    },
  });

  const formatDateToISO = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  const onSubmit = async (data: FormData) => {
    const formattedDate = formatDateToISO(data.buyDate);
    const updatedData = {
      ...data,
      buyDate: formattedDate,
      numberOfBall: parseInt(data.numberOfBall, 10),
      ballCost: isNaN(data.ballCost) ? 0 : data.ballCost,
      numberOfTape: parseInt(data.numberOfTape, 10),
      tapeCost: isNaN(data.tapeCost) ? 0 : data.tapeCost,
    };

    try {
      const response = await fetch(
        `https://bt-sports-backend.vercel.app/api/campaign/expense/update/${expense._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Expense updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          onSuccess();
        } else {
          throw new Error("Update failed");
        }
      } else {
        throw new Error("Failed to update expense");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update expense. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Buyer</label>
        <input
          type="text"
          {...register("buyer", { required: "Buyer name is required" })}
          placeholder="Enter buyer name"
          className="w-full p-2 border border-gray-300 rounded bg-white text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Number of Ball & Ball Cost</label>
        <div className="flex space-x-4">
          <select
            {...register("numberOfBall", { required: "Number of balls is required" })}
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
            {...register("ballCost", { valueAsNumber: true })}
            placeholder="Enter ball cost"
            className="w-1/2 p-2 border border-gray-300 rounded bg-white text-black"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Number of Tape & Tape Cost</label>
        <div className="flex space-x-4">
          <select
            {...register("numberOfTape", { required: "Number of tapes is required" })}
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
            {...register("tapeCost", { valueAsNumber: true })}
            placeholder="Enter tape cost"
            className="w-1/2 p-2 border border-gray-300 rounded bg-white text-black"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Buy Date</label>
        <input
          type="date"
          {...register("buyDate", { required: "Buy date is required" })}
          className="w-full p-2 border border-gray-300 rounded bg-white text-black"
        />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Update
      </button>
      <button
        type="button"
        onClick={onClose}
        className="w-full bg-gray-500 text-white p-2 rounded mt-2"
      >
        Close
      </button>
    </form>
  );
};

export default UpdateExpenseForm;
