import SectionTitle from "../../../Shared/SectionTitle";
import Marquee from "react-fast-marquee";

const ImageGallery = () => {
  // Sample gallery image data
  const galleryImage = [
    { image: "https://via.placeholder.com/300x250?text=Image+1" },
    { image: "https://via.placeholder.com/300x250?text=Image+2" },
    { image: "https://via.placeholder.com/300x250?text=Image+3" },
    { image: "https://via.placeholder.com/300x250?text=Image+4" },
    { image: "https://via.placeholder.com/300x250?text=Image+5" },
    { image: "https://via.placeholder.com/300x250?text=Image+6" },
    { image: "https://via.placeholder.com/300x250?text=Image+7" },
  ];

  return (
    <div className=" border w-full bg-gray-200 p-4 mt-8">

 
<h1 className="text-2xl font-bold mb-4">Image Gallery</h1>
    <div className="my-8">
      <div className="overflow-hidden">
        <Marquee speed={50} gradient={false}>
          {galleryImage.map((data, index) => (
            <div key={index} className="flex-shrink-0 mx-4">
              <img
                src={data.image}
                className="h-[250px] w-auto object-cover rounded-lg shadow-md"
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
