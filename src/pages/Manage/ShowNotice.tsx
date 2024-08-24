/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import useNotice from "../../hooks/useNotice";
import LoadingPage from "../Shared/LoadingPage";
import useAuth from "../../utils/getUser";
import NoData from "../Shared/NoData";
import AddNotice from "./AddNotice";
import HeadingWithSubheading from "../../Layout/HeadingWithSubheading";
import Swal from "sweetalert2";

interface Notice {
  _id: string; // Add _id to interface
  date: string;
  subject: string;
  description: string; // Add description to interface
  status: string;
}

const ShowNotice = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [noticeAll, allNoticeLoading, noticeRefetch] = useNotice();

  const user = useAuth();
  console.log(user);

  useEffect(() => {
    if (noticeAll && noticeAll.data) {
      setNotices(noticeAll.data);
    }
  }, [noticeAll]);

  const formatDate = (timestamp: any) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  if (allNoticeLoading) {
    return <LoadingPage></LoadingPage>; // Handle loading state
  }

  // if (!notices.length) {
  //   return (
  //     <div>
  //       <NoData title={"No Notices Available"} subTitle={"notice"}></NoData>
  //     </div>
  //   ); // Handle empty state
  // }

  console.log(notices);

  const handleDeleteNotice = (id: string) => {
    console.log(id);
    // https://bt-sports-backend.vercel.app/api/notice/66b8c4087862325876f6a247
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
            `https://bt-sports-backend.vercel.app/api/notice/${id}`,
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

          const result = await response.json();
          console.log("Deleted successfully:", result);
          Swal.fire({
            title: "Deleted!",
            text: "Notice has been deleted.",
            icon: "success",
          });

          // Optionally refetch the notice list or update the state to remove the deleted notice
          noticeRefetch();
        } catch (error) {
          console.error("Error deleting notice:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the notice. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const handleUpdate = async (status: string, id: string) => {
    console.log(status, id);

    // Show confirmation alert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Make PATCH request to update notice status
          const response = await fetch(
            `https://bt-sports-backend.vercel.app/api/notice/${id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status }), // Send the status in the request body
            }
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const result = await response.json();
          console.log("Updated successfully:", result);

          // Show success alert
          Swal.fire({
            title: "Updated!",
            text: "Notice has been updated.",
            icon: "success",
          });

          // Optionally refetch or update the state to reflect the change
          noticeRefetch();
        } catch (error) {
          console.error("Error updating notice:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to update the notice. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  return (
    <div>
      {user && <AddNotice refetch={noticeRefetch}></AddNotice>}

      <HeadingWithSubheading
        heading={"All Notices"}
        subheading={"All important notice information"}
      ></HeadingWithSubheading>
      <div className="overflow-x-auto">
        {notices?.length > 0 ? (
          <>
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Subject</th>
                  <th className="py-2 px-4">Notice</th>

                  {user && (
                    <>
                      <th className="py-2 px-4">Status</th>
                      <th className="py-2 px-4">Action</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {notices.map((notice, index) => (
                  <tr key={index} className="text-center border-b">
                    <td className="py-2 px-4">{formatDate(notice.date)}</td>
                    <td className="py-2 px-4">{notice.subject}</td>
                    <td className="py-2 px-4">{notice.description}</td>

                    {user && (
                      <>
                        <td className="py-2 px-4">{notice.status}</td>
                        <td className="py-2 px-4 flex justify-center space-x-2">
                          {notice.status === "pending" ? (
                            <>
                              <button
                                onClick={() =>
                                  handleUpdate("approved", notice._id)
                                }
                              >
                                <FontAwesomeIcon icon={faCheckCircle} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  handleUpdate("pending", notice._id)
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faCheckCircle}
                                  className="text-green-600" // Tailwind custom color class
                                />
                              </button>
                            </>
                          )}

                          <button
                            className="text-red-500 hover:text-red-700"
                            title="Delete"
                            onClick={() => handleDeleteNotice(notice._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div>
              <NoData
                title={"No Notices Available"}
                subTitle={"notice"}
              ></NoData>
            </div>
          </>
        )}
      </div>

      <div></div>
    </div>
  );
};

export default ShowNotice;





