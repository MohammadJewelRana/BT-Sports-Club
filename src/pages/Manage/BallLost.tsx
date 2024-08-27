/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUndoAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import useBallLost from "../../hooks/useBallLost";
import LoadingPage from "../Shared/LoadingPage";
import useAuth from "../../utils/getUser";
import NoData from "../Shared/NoData";
import HeadingWithSubheading from "../../Layout/HeadingWithSubheading";
import Swal from "sweetalert2";
import AddBallLost from "./AddBallLost";
import { useForm } from "react-hook-form";

// TypeScript Interfaces
interface LostDetail {
  lostDate: string;
  lostBallCount: number;
}

interface ReturnDetail {
  returnDate: string;
  returnedBallCount: number;
}

interface ModalData {
  lostDetails: LostDetail[];
  returnDetails: ReturnDetail[];
}

const BallLost = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showEyeModal, setShowEyeModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>({
    lostDetails: [],
    returnDetails: [],
  });
  const [data, isLoading, refetch] = useBallLost();
  const ballLostData = data?.data;
  const user = useAuth();
  const { register, handleSubmit, reset } = useForm();

  if (isLoading) {
    return <LoadingPage />;
  }

  const closeModal = () => {
    const modalCheckbox = document.getElementById(
      "my_modal_6"
    ) as HTMLInputElement;
    if (modalCheckbox) {
      modalCheckbox.checked = false;
    }

    reset();
    setSelectedId(null);
  };

  const handleReturn = (id: string) => {
    setSelectedId(id);
    document.getElementById("my_modal_6")?.click();
  };

  const onSubmit = async (formData: any) => {
    if (!selectedId) return;
    const { returnedBall, date } = formData;
    const newData = {
      returnDate: date,
      returnedBallCount: Number(returnedBall),
    };

    try {
      const response = await fetch(
        `https://bt-sports-backend.vercel.app/api/notice/ball-lost/${selectedId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      Swal.fire("Success!", "Ball return record has been updated.", "success");
      refetch();
      closeModal();
    } catch (error) {
      Swal.fire(
        "Error!",
        "Failed to update the ball return record. Please try again.",
        "error"
      );
    }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://bt-sports-backend.vercel.app/api/notice/ball-lost/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          Swal.fire("Deleted!", "Ball lost has been deleted.", "success");
          refetch();
        } catch (error) {
          Swal.fire(
            "Error!",
            "Failed to delete the ball lost. Please try again.",
            "error"
          );
        }
      }
    });
  };

  const handleShowEyeModal = (lost: {
    lostDetails: LostDetail[];
    returnDetails: ReturnDetail[];
  }) => {
    setModalData({
      lostDetails: lost.lostDetails,
      returnDetails: lost.returnDetails,
    });
    setShowEyeModal(true);
  };

  const closeEyeModal = () => {
    setShowEyeModal(false);
  };

  // Calculate totals
  const totalLostBallCount = modalData.lostDetails.reduce(
    (acc, detail) => acc + detail.lostBallCount,
    0
  );
  const totalReturnedBallCount = modalData.returnDetails.reduce(
    (acc, detail) => acc + detail.returnedBallCount,
    0
  );

  // Filter data to exclude rows with remaining equal to 0
  const filteredData = ballLostData?.filter((item: any) => item.remaining > 0);

  return (
    <div>
      {user && <AddBallLost refetch={refetch} />}

      <HeadingWithSubheading
        heading={"Ball Lost List"}
        subheading={"Details of who lost the ball"}
      />

      <div className="overflow-x-auto">
        {filteredData?.length > 0 ? (
          <>
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Lost</th>
                  <th className="py-2 px-4">Return</th>
                  <th className="py-2 px-4">Remaining</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((lost: any) => (
                  <tr key={lost._id} className="text-center border-b">
                    <td className="py-2 px-4">{lost.name}</td>
                    <td className="py-2 px-4">{lost.totalLost}</td>
                    <td className="py-2 px-4">{lost.totalGiven}</td>
                    <td className="py-2 px-4">{lost.remaining}</td>
                    <td className="py-2 px-4 flex justify-center space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        title="View"
                        onClick={() => handleShowEyeModal(lost)} // Pass lostDetails to modal
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      {user && (
                        <>
                          <button
                            className="text-green-500 hover:text-green-700"
                            title="Return"
                            onClick={() => handleReturn(lost._id)}
                          >
                            <FontAwesomeIcon icon={faUndoAlt} />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            title="Delete"
                            onClick={() => handleDelete(lost._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <NoData
            title={"No Ball Lost Records Available"}
            subTitle={"ball lost"}
          />
        )}
      </div>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-white text-black">
          <h3 className="text-lg font-bold mb-4">Return Ball</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6 w-full">
              <label htmlFor="returnedBall" className="block mb-2 ml-1">
                Returned Ball:
              </label>
              <select
                className="border w-full px-3 py-2 rounded-lg text-black bg-white"
                {...register("returnedBall", {
                  required: "Ball count is required",
                })}
              >
                <option value="">Select Number</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
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
            </div>

            <div className="modal-action">
              <button
                type="submit"
                className="bg-green-600 py-1 px-4 rounded-md text-white cursor-pointer"
              >
                <label htmlFor="my_modal_6" className="cursor-pointer">
                  Submit
                </label>
              </button>
              <button
                type="button"
                className="bg-red-600 py-1 px-4 rounded-md text-white cursor-pointer"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>

      {showEyeModal && (
        <div className="fixed flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box bg-white text-black">
              <h3 className="text-lg font-bold mb-4">Ball Lost Details</h3>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-gray-200 text-center">
                      <th className="py-2 px-4">Lost Date</th>
                      <th className="py-2 px-4">Lost Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalData.lostDetails.length > 0 ? (
                      modalData.lostDetails.map((detail, index) => (
                        <tr key={index} className="text-center border-b">
                          <td className="py-2 px-4">
                            {new Date(detail.lostDate).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-4">{detail.lostBallCount}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="py-2 px-4 text-center">
                          No details available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <h4 className="text-lg font-bold mt-4 mb-2">
                  Returned Details
                </h4>
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-gray-200 text-center">
                      <th className="py-2 px-4">Return Date</th>
                      <th className="py-2 px-4">Returned Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalData.returnDetails.length > 0 ? (
                      modalData.returnDetails.map((detail, index) => (
                        <tr key={index} className="text-center border-b">
                          <td className="py-2 px-4">
                            {new Date(detail.returnDate).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-4">
                            {detail.returnedBallCount}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="py-2 px-4 text-center">
                          No details available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-end  ">
                <div className="text-center ">
                  <div className="font-bold">Total Lost Balls:</div>
                  <div>{totalLostBallCount}</div>
                </div>
                <div className="ml-6 text-center">
                  <div className="font-bold">Total Returned Balls:</div>
                  <div>{totalReturnedBallCount}</div>
                </div>
              </div>

              <div className="modal-action">
                <button
                  className="bg-red-600 py-1 px-4 rounded-md text-white"
                  onClick={closeEyeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BallLost;
