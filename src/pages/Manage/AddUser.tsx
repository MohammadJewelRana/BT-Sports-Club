import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Heading from "../../Layout/Heading";
// import axios from 'axios';

interface FormData {
  name: string;
  profession: string;
  whatsapp: string;
  image: FileList;
  buildingNumber: string;
  flatName: string;
   
}

const AddUser = () => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const onSubmit = async (data: FormData) => {
    const imageFile = data.image[0];

    console.log(data);

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      //   try {
      //     // Upload image to ImgBB
      //     const response = await axios.post(
      //       "https://api.imgbb.com/1/upload",
      //       formData,
      //       {
      //         params: {
      //           key: "YOUR_IMGBB_API_KEY", // Replace with your ImgBB API key
      //         },
      //       }
      //     );

      //     const imageUrl = response.data.data.url; // URL of the uploaded image
      //     console.log("Image URL:", imageUrl);

      //     // Handle form data submission with the image URL
      //     console.log("Form Data:", {
      //       ...data,
      //       imageUrl,
      //     });
      //   } catch (error) {
      //     console.error("Image upload failed:", error);
      //   }
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
      <div className="max-w-6xl mt-8 mx-auto p-4 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4">Upload User Information</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <div className="mb-6 w-full">
              <label htmlFor="name" className="block mb-2  ml-1">
                Profession :
              </label>
              <select
                className="  border w-full px-3 py-2 rounded-lg text-black "
                // {...register("categoryName")}
                {...register("profession", { required: true })}
              >
                <option value=""> Profession</option>
                <option value="Student">Student</option>
                <option value="Doctor"> Doctor </option>
                <option value="Engineer"> Engineer </option>
                <option value="Banker"> Banker </option>
                <option value="Businessman"> Businessman </option>
                <option value="Others"> Others.. </option>
              </select>
              {errors.profession && (
                <span className="mt-4 text-red-600">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">WhatsApp</label>
            <input
              type="text"
              {...register("whatsapp", { required: "WhatsApp is required" })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex  justify-between">
            <div className="mb-4 w-[48%]">
              <label className="block text-gray-700">Building Number</label>
              <input
                type="text"
                {...register("buildingNumber", {
                  required: "Building Number is required",
                })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4 w-[48%]">
              <label className="block text-gray-700">Flat Name</label>
              <input
                type="text"
                {...register("flatName", { required: "Flat Name is required" })}
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
                    onChange(e.target.files);
                    setValue("image", e.target.files);
                  }}
                  className="w-full p-2 border border-gray-300 rounded "
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
            className="bg-blue-500 w-full text-white p-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
