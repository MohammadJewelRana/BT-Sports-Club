/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import useNotice from "../../hooks/useNotice";
import LoadingPage from "../Shared/LoadingPage";
import useAuth from "../../utils/getUser";
import NoData from "../Shared/NoData";
import AddNotice from "./AddNotice";
import HeadingWithSubheading from "../../Layout/HeadingWithSubheading";

interface Notice {
  date: string;
  subject: string;
  notice: string;
  status: string;
}

const ShowNotice = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [noticeAll, allNoticeLoading, noticeRefetch] = useNotice();

  const user = useAuth();
  console.log(user);

  useEffect(() => {
    if (noticeAll && noticeAll.data) {
      setNotices(noticeAll.data);
    }
  }, [noticeAll]);

  const formatDate = (timestamp: any) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  if (allNoticeLoading) {
    return <LoadingPage></LoadingPage>; // Handle loading state
  }

  if (!notices.length) {
    return (
      <div>
        <NoData title={"No Notices Available"} subTitle={"notice"}></NoData>
      </div>
    ); // Handle empty state
  }

  return (
    <div>
      <AddNotice refetch={noticeRefetch}></AddNotice>

      <HeadingWithSubheading
        heading={"  all Notice"}
        subheading={"All  important notice information "}
      ></HeadingWithSubheading>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Subject</th>
              <th className="py-2 px-4">Notice</th>

              {user && (
                <>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Action</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {notices.map((notice, index) => (
              <tr key={index} className="text-center border-b">
                <td className="py-2 px-4">{formatDate(notice.date)}</td>
                <td className="py-2 px-4">{notice.subject}</td>
                <td className="py-2 px-4">{notice.description}</td>

                {user && (
                  <>
                    <td className="py-2 px-4">{notice.status}</td>
                    <td className="py-2 px-4 flex justify-center space-x-2">
                      <button>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </button>

                      <button
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowNotice;
