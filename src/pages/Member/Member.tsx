 /* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";
import Heading from "../../Layout/Heading";
import LoadingPage from "../Shared/LoadingPage";
import useAuth from "../../utils/getUser";
import { FaCamera, FaEdit, FaTrash } from "react-icons/fa";
import NoData from "../Shared/NoData";
import { useForm } from "react-hook-form";

const Member = ({ state }: { state: any }) => {
  const [userAll, allUserLoading, userRefetch] = useUser();
  const user = useAuth();
  const allUser = userAll?.data;

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [imgProfile, setImgProfile] = useState<File | string | null>(null); // Updated type
  const [preview, setPreview] = useState<string>(""); // State to hold image preview URL

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      setPreview(fileURL);
      setImgProfile(selectedFile); // Update imgProfile with the new file
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      profession: "",
      whatsapp: "",
      status: "",
    },
  });

  if (state) {
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
            throw new Error(`${response?.statusText}`);
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

  const handleUpdate = (user: any) => {
    setSelectedUser(user);
    setValue("name", user.name);
    setValue("profession", user.profession);
    setValue("whatsapp", user.whatsapp);
    setValue("status", user.status);
    setImgProfile(user.profileImg); // Set the initial image profile
    setPreview(user.profileImg); // Set the preview to the existing image
    setModalOpen(true);
  };

  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      let imageUrl = imgProfile;

      // If a new image has been selected, upload it to ImgBB
      if (imgProfile && typeof imgProfile === "object" && imgProfile instanceof File) {
        const formData = new FormData();
        formData.append("image", imgProfile);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_Image_Upload_Token
          }`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();
        if (result.success) {
          imageUrl = result.data.url; // Get the URL of the uploaded image
        } else {
          throw new Error("Image upload failed");
        }
      }

      // Implement the update logic here
      const updatedData = { ...data, profileImg: imageUrl };
      const response = await fetch(
        `https://bt-sports-backend.vercel.app/api/user/${selectedUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Updated!",
          text: "User information has been updated.",
          icon: "success",
        });
        setModalOpen(false);
        userRefetch();
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update the user. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <Heading heading="All Members" />
      <div className="w-full mt-6">
        {allUser?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-400 p-4 font-semibold text-white text-center">
                  <th className="py-4">Picture</th>
                  <th className="py-4">Name</th>
                  <th className="py-4">Profession</th>
                  <th className="py-4">WhatsApp</th>
                  {user && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {allUser.map((contact: any, index: any) => (
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
                      <td className="p-2 flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleUpdate(contact)}
                          className="text-blue-600"
                          title="edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 px-3 py-1 rounded-full"
                          onClick={() => handleDelete(contact._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <NoData title={"No members Available"} subTitle={" member "} />
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-white text-black">
            <h3 className="text-lg font-bold mb-4">Update User Information</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
              <img
  src={typeof preview === "string" ? preview : imgProfile ? (typeof imgProfile === "string" ? imgProfile : undefined) : "default_image_url_here"}
  alt="Profile"
  className="h-[400px] mx-auto w-full mb-12 object-cover"
/>
                <label
                  htmlFor="file-upload"
                  className="absolute bottom-0 right-0 p-4"
                >
                  <FaCamera className="text-gray-600 text-3xl cursor-pointer" />
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name:
                </label>
                <input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="profession"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Profession:
                </label>
                <input
                  id="profession"
                  {...register("profession", {
                    required: "Profession is required",
                  })}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
                {errors.profession && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.profession.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="whatsapp"
                  className="block text-gray-700 font-bold mb-2"
                >
                  WhatsApp:
                </label>
                <input
                  id="whatsapp"
                  {...register("whatsapp", {
                    required: "WhatsApp number is required",
                  })}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
                {errors.whatsapp && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.whatsapp.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Status:
                </label>
                <input
                  id="status"
                  {...register("status", {
                    required: "Status is required",
                  })}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Member;
