 

const ImportantNotice = () => {
  const notices = [
    'System maintenance scheduled for tonight.',
    'New features coming next week!',
    'Holiday hours for the office.',
  ];

  return (
    <div className="bg-blue-500 text-white p-2">
      <marquee behavior="scroll" direction="left" scrollamount="5">
        Important Notice: System maintenance scheduled for tonight. New features coming next week! Holiday hours for the office.
      </marquee>
    </div>
  );
};

export default ImportantNotice;
