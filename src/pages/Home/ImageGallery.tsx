/* eslint-disable @typescript-eslint/no-explicit-any */
import Marquee from "react-fast-marquee";
import useImage from "../../hooks/useImage";
import LoadingPage from "../Shared/LoadingPage";

const ImageGallery = () => {
  const [data, isLoading] = useImage();
  // console.log(data);
  if(isLoading){
    return <LoadingPage></LoadingPage>
  }

  return (
    <div className=" border w-full bg-gray-200 p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>
      <div className="my-8">
        <div className="overflow-hidden">
          <Marquee speed={50} gradient={false}>
            {data?.map((data:any, index:any) => (
              <div key={index} className="flex-shrink-0 mx-4">
                <img
                  src={data.image}
                  className="h-[250px] w-[250px] object-cover rounded-lg shadow-md mr-12"
                  alt={`Gallery item ${index + 1}`}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
