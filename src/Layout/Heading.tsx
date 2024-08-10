const Heading = ({ heading }: { heading: string }) => {
  return (
    <div className="border w-full bg-gray-300 p-4 ">
      <h1 className="text-2xl font-semibold italic capitalize">{heading}</h1>
    </div>
  );
};

export default Heading;
