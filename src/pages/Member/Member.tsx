/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";
import Heading from "../../Layout/Heading";
import LoadingPage from "../Shared/LoadingPage";
import useAuth from "../../utils/getUser";
import { FaEdit } from "react-icons/fa";
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
    console.log(status, id);
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
          console.log(response);

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

  const gridCols = user ? "grid-cols-6" : "grid-cols-4";

  return (
    <div>
      <Heading heading="All Members" />
      <div className="w-full mt-6">
        {allUser?.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <div className="w-full bg-white shadow-md rounded-lg">
                <div
                  className={`grid ${gridCols} bg-blue-400 p-4 font-semibold text-white text-center`}
                >
                  <div>Picture</div>
                  <div>Name</div>
                  <div>Profession</div>
                  <div>WhatsApp</div>
                  {user && (
                    <>
                      <div>Status</div>
                      <div>Action</div>
                    </>
                  )}
                </div>
                {allUser?.map((contact: any, index: any) => (
                  <div
                    key={index}
                    className={`cursor-pointer grid ${gridCols} text-center p-4 border-b border-gray-200 text-gray-800 items-center hover:bg-blue-100 hover:transition-all hover:duration-300`}
                  >
                    <div className="flex justify-center">
                      <img
                        src={contact.profileImg}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    <div>{contact.name}</div>
                    <div>{contact.profession}</div>
                    <div>
                      <a
                        href={`https://wa.me/${contact.whatsapp.replace(
                          /\D/g,
                          ""
                        )}`}
                        className="text-green-500 hover:underline"
                      >
                        {contact.whatsapp}
                      </a>
                    </div>

                    {user && (
                      <>
                        <div className="flex items-center gap-2 justify-center">
                          <p>{contact?.status}</p>
                          <button
                            onClick={() =>
                              handleUpdate(
                                contact?._id,
                                contact?.status === "active"
                                  ? "inactive"
                                  : "active"
                              )
                            }
                          >
                            <FaEdit title="status change" />
                          </button>
                        </div>
                        <div>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                            onClick={() => handleDelete(contact._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <NoData
                title={"No    members Available"}
                subTitle={" member  "}
              ></NoData>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Member;
