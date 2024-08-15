import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Heading from "../../Layout/Heading";
import Swal from "sweetalert2";
import Member from "../Member/Member";

interface FormData {
  name: string;
  profession: string;
  whatsapp: string;
  image: FileList;
  buildingNumber: string;
  flatName: string;
}

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddUser = () => {
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for submit button
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = async (data: FormData) => {
    setLoading(true); // Set loading to true when starting submission
    const imageFile = data.image[0];
    const { name, profession, whatsapp, buildingNumber, flatName } = data;

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      fetch(img_hosting_url, {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgResponse) => {
          if (imgResponse.success) {
            const imgURL = imgResponse.data.display_url;
            const userInfo = {
              name,
              profession,
              whatsapp,
              address: { buildingNumber, flatNumber: flatName },
              profileImg: imgURL,
            };

            fetch("https://bt-sports-backend.vercel.app/api/user/create-user", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userInfo),
            })
              .then((res) => res.json())
              .then((data) => {
                setLoading(false); // Set loading to false when done
                if (data?.success === true) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User added successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  reset();
                  setState(true);
                }
              })
              .catch((error) => {
                setLoading(false); // Set loading to false on error
                console.log(error);
                Swal.fire({
                  title: "Error!",
                  text: "Do you want to continue",
                  icon: "error",
                  confirmButtonText: "OK",
                });
              });
          }
        });
    }
  };

  // Watch the image input field to show preview
  const imageFile = watch("image");
  React.useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  return (
    <div>
      <Heading heading={"Add User"}></Heading>
      <button
        onClick={() => setShowForm(!showForm)} // Toggle form visibility
        className="bg-blue-500 mt-2 float-right text-white p-2 rounded"
      >
        {showForm ? "Hide Form" : "Add User"}
      </button>

      {showForm && (
        <div className="max-w-6xl mt-16 mx-auto p-4 bg-white shadow-md rounded">
          <h2 className="text-2xl font-bold mb-4">Upload User Information</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter the user's name"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-6 w-full">
              <label htmlFor="profession" className="block mb-2 ml-1">
                Profession:
              </label>
              <select
                className="border w-full px-3 py-2 rounded-lg text-black"
                {...register("profession", { required: true })}
              >
                <option value="">Profession</option>
                <option value="Student">Student</option>
                <option value="Doctor">Doctor</option>
                <option value="Engineer">Engineer</option>
                <option value="Banker">Banker</option>
                <option value="Businessman">Businessman</option>
                <option value="Others">Others..</option>
              </select>
              {errors.profession && (
                <span className="mt-4 text-red-600">
                  This field is required
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">WhatsApp</label>
              <input
                type="text"
                {...register("whatsapp", {
                  required: "WhatsApp is required",
                })}
                placeholder="Enter WhatsApp number"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex justify-between">
              <div className="mb-4 w-[48%]">
                <label className="block text-gray-700">Building Number</label>
                <input
                  type="text"
                  {...register("buildingNumber", {
                    required: "Building Number is required",
                  })}
                  placeholder="Enter building number"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4 w-[48%]">
                <label className="block text-gray-700">Flat Name</label>
                <input
                  type="text"
                  {...register("flatName", {
                    required: "Flat Name is required",
                  })}
                  placeholder="Enter flat name"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Image</label>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange } }) => (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      // Ensure files is not null
                      const files = e.target.files || new DataTransfer().files;
                      onChange(files);
                      setValue("image", files);
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                )}
              />
            </div>
            {imagePreview && (
              <div className="mb-4">
                <img
                  src={imagePreview as string}
                  alt="Preview"
                  className="w-full h-[400px] rounded"
                />
              </div>
            )}
            <button
              type="submit"
              className={`bg-blue-500 w-full text-white p-2 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full border-solid border-blue-500"
                    viewBox="0 0 24 24"
                  ></svg>
                  Loading...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      )}

      <div className="mt-24">
        <Member state={state}></Member>
      </div>
    </div>
  );
};

export default AddUser;
