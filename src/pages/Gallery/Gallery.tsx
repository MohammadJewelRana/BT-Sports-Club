/* eslint-disable @typescript-eslint/no-explicit-any */

import HeadingWithSubheading from "../../Layout/HeadingWithSubheading";
import useImage from "../../hooks/useImage";
import LoadingPage from "../Shared/LoadingPage";
import NoData from "../Shared/NoData";

const Gallery = () => {
  const [data, isLoading] = useImage();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="p-4">
      <HeadingWithSubheading
        heading={"Gallery"}
        subheading={"All images of our beautiful members"}
      />

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {data?.length > 0 ? (
          <>
            {data.map((image: any, index: any) => (
              <div
                key={index}
                className="rounded-lg shadow-lg w-full sm:w-auto sm:flex-1 sm:max-w-xs"
              >
                <img
                  src={image.image}
                  alt={`Gallery item ${index + 1}`}
                  className="cursor-pointer w-[300px] h-[400px] object-cover hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <div>
              <NoData
                title={"No Image Available"}
                subTitle={"    image"}
              ></NoData>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;
