 /* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";
import Heading from "../../Layout/Heading";
import LoadingPage from "../Shared/LoadingPage";
import useAuth from "../../utils/getUser";
import { FaEdit, FaTrash } from "react-icons/fa";
import NoData from "../Shared/NoData";

const Member = ({ state }: { state: any }) => {
  const [userAll, allUserLoading, userRefetch] = useUser();
  const user = useAuth();
  const allUser = userAll?.data;

  if (state === true) {
    userRefetch();
  }

  if (allUserLoading) {
    return <LoadingPage />;
  }

  const handleDelete = async (id: string) => {
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
            `https://bt-sports-backend.vercel.app/api/user/${id}`,
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
            text: "User has been deleted.",
            icon: "success",
          });

          userRefetch();
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the user. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const handleUpdate = (id: string, status: string) => {
    const updatedData = { status };

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
          const response = await fetch(
            `https://bt-sports-backend.vercel.app/api/user/${id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedData),
            }
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const result = await response.json();
          console.log("Updated successfully:", result);

          Swal.fire({
            title: "Updated!",
            text: "User Status has been updated.",
            icon: "success",
          });

          userRefetch();
        } catch (error) {
          console.error("Error updating notice:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to update the user. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  return (
    <div>
      <Heading heading="All Members" />
      <div className="w-full mt-6">
        {allUser?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-400 p-4 font-semibold text-white text-center ">
                  <th className="py-4">Picture</th>
                  <th className="py-4">Name</th>
                  <th className="py-4">Profession</th>
                  <th className="py-4">WhatsApp</th>
                  {user && (
                    <>
                      <th>Status</th>
                      <th>Action</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {allUser?.map((contact: any, index: any) => (
                  <tr
                    key={index}
                    className="text-center border-b border-gray-200 text-gray-800 hover:bg-blue-100 hover:transition-all hover:duration-300"
                  >
                    <td className="p-2">
                      <img
                        src={contact.profileImg}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    </td>
                    <td className="p-2 truncate">{contact.name}</td>
                    <td className="p-2 truncate">{contact.profession}</td>
                    <td className="p-2 truncate">
                      <a
                        href={`https://wa.me/${contact.whatsapp.replace(
                          /\D/g,
                          ""
                        )}`}
                        className="text-green-500 hover:underline"
                      >
                        {contact.whatsapp}
                      </a>
                    </td>

                    {user && (
                      <>
                        <td className="p-2">
                          <div className="flex items-center justify-center gap-2">
                            <p className="truncate">{contact?.status}</p>
                            <button
                              onClick={() =>
                                handleUpdate(
                                  contact?._id,
                                  contact?.status === "active"
                                    ? "inactive"
                                    : "active"
                                )
                              }
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <FaEdit title="Change status" />
                            </button>
                          </div>
                        </td>
                        <td className="p-2">
                          <button
                            className="text-red-600 hover:text-red-800 px-3 py-1 rounded-full"
                            onClick={() => handleDelete(contact._id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <NoData
            title={"No members Available"}
            subTitle={" member "}
          />
        )}
      </div>
    </div>
  );
};

export default Member;
