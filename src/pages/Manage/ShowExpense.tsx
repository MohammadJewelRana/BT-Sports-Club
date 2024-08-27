 /* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Swal from "sweetalert2";
import useExpense from "../../hooks/useExpense";
import HeadingWithSubheading from "../../Layout/HeadingWithSubheading";
import LoadingPage from "../Shared/LoadingPage";
import AddExpense from "./AddExpense";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import useAuth from "../../utils/getUser";
import UpdateExpenseForm from "./UpdateExpenseForm";

const ShowExpense = () => {
  const [data, isLoading, refetch] = useExpense();
  const [editExpense, setEditExpense] = useState<any>(null); // For storing the expense to be edited
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const expenseData = data?.data;
  const user = useAuth();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  const grandTotal = expenseData?.reduce((total: any, expense: any) => {
    return total + expense.totalCost;
  }, 0);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://bt-sports-backend.vercel.app/api/campaign/expense/${id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const result = await response.json();
          console.log(result);
          
          Swal.fire({
            title: "Updated!",
            text: "Expense has been deleted.",
            icon: "success",
          });
          refetch();
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the expense. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const handleEdit = (expense: any) => {
    setEditExpense(expense);
    setIsModalOpen(true);
  };

  return (
    <div>
      {user && <AddExpense refetch={refetch} />}

      <div>
        <HeadingWithSubheading
          heading={"Expense"}
          subheading={"Important Expense information"}
        />
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-blue-700">
                  <th className="px-4 py-2 border-b text-white">Date</th>
                  <th className="px-4 py-2 border-b text-white">Name</th>
                  <th className="px-4 py-2 border-b text-white">Ball Count</th>
                  <th className="px-4 py-2 border-b text-white">Ball Cost</th>
                  <th className="px-4 py-2 border-b text-white">Tape Count</th>
                  <th className="px-4 py-2 border-b text-white">Tape Cost</th>
                  <th className="px-4 py-2 border-b text-white">Total</th>
                  {user && <th className="px-4 py-2 border-b text-white">Action</th>}
                </tr>
              </thead>
              <tbody>
                {expenseData?.map((item: any) => (
                  <tr key={item._id} className="hover:bg-gray-100 cursor-pointer text-center">
                    <td className="px-4 py-2 border-b">{formatDate(item.buyDate)}</td>
                    <td className="px-4 py-2 border-b">{item.buyer}</td>
                    <td className="px-4 py-2 border-b">{item.numberOfBall}</td>
                    <td className="px-4 py-2 border-b">{item.ballCost}</td>
                    <td className="px-4 py-2 border-b">{item.numberOfTape}</td>
                    <td className="px-4 py-2 border-b">{item.tapeCost}</td>
                    <td className="px-4 py-2 border-b">{item.totalCost}</td>
                    {user && (
                      <td className="px-4 py-2 border-b text-center ">
                        <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 mr-4">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800">
                          <FaTrashAlt />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="float-right">
              <p className="font-bold text-gray-500 py-4 pr-8 text-lg">
                Grand Total: <span>{grandTotal}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Update Expense Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-white text-black">
            <h3 className="text-lg font-bold mb-4">Update Expense</h3>
            <UpdateExpenseForm
              expense={editExpense}
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => {
                refetch();
                setIsModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowExpense;
