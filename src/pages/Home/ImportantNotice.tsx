 /* eslint-disable @typescript-eslint/no-explicit-any */
import useNotice from "../../hooks/useNotice";
import LoadingPage from "../Shared/LoadingPage";
import './ImportantNotice.css'

const ImportantNotice = () => {
  const [noticeAll, allNoticeLoading] = useNotice();

  const allData = noticeAll?.data;
  const approved = allData?.filter((item: any) => item.status === "approved");

  if (allNoticeLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="bg-blue-500 text-white p-2 overflow-hidden">
      <div className="whitespace-nowrap animate-marquee">
        {approved?.map((item: any, index: number) => (
          <span key={index} className="font-bold pr-32">
            Important Notice: {item.description}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ImportantNotice;
