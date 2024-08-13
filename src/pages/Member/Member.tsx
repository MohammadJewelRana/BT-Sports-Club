/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";
import Heading from "../../Layout/Heading";
import LoadingPage from "../Shared/LoadingPage";
import useAuth from "../../utils/getUser";

const Member = ({ state }) => {
  const [userAll, allUserLoading, userRefetch] = useUser();
  const user = useAuth();
  console.log(userAll.data);
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
          const response = await fetch(`http://localhost:5000/api/user/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

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

          // Optionally refetch the user list or update the state to remove the deleted user
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

  const gridCols = user ? "grid-cols-5" : "grid-cols-4";

  return (
    <div>
      <Heading heading="All Members" />
      <div className="w-full mt-6">
        <div className="overflow-x-auto">
          <div className="w-full bg-white shadow-md rounded-lg">
            <div
              className={`grid ${gridCols} bg-blue-400 p-4 font-semibold text-white text-center`}
            >
              <div>Picture</div>
              <div>Name</div>
              <div>Profession</div>
              <div>WhatsApp</div>
              {user && <div>Action</div>}
            </div>
            {allUser?.map((contact, index) => (
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
                  <div>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                      onClick={() => handleDelete(contact._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
