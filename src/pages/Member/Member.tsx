import Heading from "../../Layout/Heading";

const Member = () => {
  const contacts = [
    {
      picture: "https://via.placeholder.com/50",
      name: "John Doe",
      whatsapp: "+1-234-567-890",
      profession: "Software Engineer",
    },
    {
      picture: "https://via.placeholder.com/50",
      name: "Jane Smith",
      whatsapp: "+1-987-654-321",
      profession: "Graphic Designer",
    },
    {
      picture: "https://via.placeholder.com/50",
      name: "Michael Brown",
      whatsapp: "+1-555-123-456",
      profession: "Marketing Manager",
    },
    // Add more contacts as needed
  ];

  return (
    <div>
      <Heading heading={"All Members"}></Heading>
      <div className="w-full mt-6">
        <div className="overflow-x-auto">
          <div className="w-full bg-white shadow-md rounded-lg">
            <div className="grid grid-cols-4 bg-blue-400 p-4 font-semibold text-white text-center">
              <div>Picture</div>
              <div>Name</div>
              <div>Profession</div>
              <div>WhatsApp</div>
            </div>
            {contacts.map((contact, index) => (
              <div
                key={index}
                className="cursor-pointer grid grid-cols-4 text-center p-4 border-b border-gray-200 text-gray-800 items-center hover:bg-blue-100 hover:transition-all hover:duration-300"
              >
                <div className="flex justify-center">
                  <img
                    src={contact.picture}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
