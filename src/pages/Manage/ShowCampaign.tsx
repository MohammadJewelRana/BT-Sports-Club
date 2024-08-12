import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faHourglassHalf,
  faPlay,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import AddCampaign from "./AddCampaign";
import HeadingWithSubheading from "../../Layout/HeadingWithSubheading";
import useCampaign from "../../hooks/useCampaign";
import LoadingPage from "../Shared/LoadingPage";
import NoData from "../Shared/NoData";
import useAuth from "../../utils/getUser";
import OnGoingCampaign from "./OnGoingCampaign";

interface TableRow {
  startDate: string;
  endDate: string;
  purpose: string;
  grandTotal: number;
  status: string;
}

const ShowCampaign = () => {
  const [campaigns, setCampaigns] = useState<TableRow[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "ongoing">("ongoing");
  const [campaignAll, allCampaignLoading, campaignRefetch] = useCampaign();
  const user = useAuth();

  useEffect(() => {
    if (campaignAll && campaignAll.data) {
      setCampaigns(campaignAll.data);
    }
  }, [campaignAll]);

  if (allCampaignLoading) {
    return <LoadingPage />; // Handle loading state
  }

  if (!campaigns.length) {
    return (
      <div>
        <NoData title={"No Campaign Available"} subTitle={"campaign"} />
      </div>
    ); // Handle empty state
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleStatusChange = (index: number, newStatus: string) => {
    setCampaigns((prevCampaigns) => {
      const newCampaigns = [...prevCampaigns];
      newCampaigns[index].status = newStatus;
      return newCampaigns;
    });

    // Optionally, update the status on the server
    // fetch(`/api/campaigns/${campaigns[index].id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status: newStatus }),
    // }).then(() => campaignRefetch());
  };

  const handleDelete = (index: number) => {
    // Handle deletion
    setCampaigns((prevCampaigns) => {
      const newCampaigns = prevCampaigns.filter((_, i) => i !== index);
      return newCampaigns;
    });

    // Optionally, delete on the server
    // fetch(`/api/campaigns/${campaigns[index].id}`, {
    //   method: 'DELETE',
    // }).then(() => campaignRefetch());
  };

  const renderActionIcons = (status: string, index: number) => {
    return (
      <div className="flex justify-center space-x-2">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleStatusChange(index, "Pending")}
          title="Set Pending"
          style={{ display: status !== "Pending" ? "inline-flex" : "none" }}
        >
          <FontAwesomeIcon icon={faHourglassHalf} />
        </button>
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleStatusChange(index, "Ongoing")}
          title="Set Ongoing"
          style={{ display: status !== "Ongoing" ? "inline-flex" : "none" }}
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button
          className="text-green-500 hover:text-green-700"
          onClick={() => handleStatusChange(index, "Ended")}
          title="Set Ended"
          style={{ display: status !== "Ended" ? "inline-flex" : "none" }}
        >
          <FontAwesomeIcon icon={faCheckCircle} />
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => handleDelete(index)}
          title="Delete"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    );
  };

  const filteredCampaigns =
    activeTab === "ongoing"
      ? campaigns.filter((campaign) => campaign.status === "ongoing")
      : campaigns;

  const onGoingData = campaigns.filter(
    (campaign) => campaign.status === "ongoing"
  );
  // console.log(onGoingData);

  return (
    <div>
      {user && <AddCampaign refetch={campaignRefetch} />}

      <HeadingWithSubheading
        heading={"  Campaigns"}
        subheading={"Important campaign information"}
      />

      <div className="mb-4">
        <button
          onClick={() => setActiveTab("ongoing")}
          className={`mr-2 p-2 rounded ${
            activeTab === "ongoing" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Ongoing Campaigns
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`p-2 rounded ${
            activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All Campaigns
        </button>
      </div>

      {activeTab === "ongoing" ? (
        <OnGoingCampaign onGoingData={onGoingData} />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="py-2 px-4">Start Date</th>
                <th className="py-2 px-4">End Date</th>
                <th className="py-2 px-4">Purpose</th>
                <th className="py-2 px-4">Grand Total</th>
          
                {user && (
                  <>
                       <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Action</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.length ? (
                filteredCampaigns.map((row, index) => (
                  <tr
                    key={index}
                    className="text-center border-b hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-2 px-4">{formatDate(row.startDate)}</td>
                    <td className="py-2 px-4">{formatDate(row.endDate)}</td>
                    <td className="py-2 px-4">{row.purpose}</td>
                    <td className="py-2 px-4">${row.grandTotal.toFixed(2)}</td> 
                    

                    {user && (
                      <>
                         <td className="py-2 px-4">{row.status}</td>
                        <td className="py-2 px-4">
                          {renderActionIcons(row.status, index)}
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={user ? 6 : 4} className="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="py-2 px-4">Start Date</th>
              <th className="py-2 px-4">End Date</th>
              <th className="py-2 px-4">Purpose</th>
              <th className="py-2 px-4">Grand Total</th>
              {user && (
                <>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Action</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.length ? (
              filteredCampaigns.map((row, index) => (
                <tr
                  key={index}
                  className="text-center border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-2 px-4">{formatDate(row.startDate)}</td>
                  <td className="py-2 px-4">{formatDate(row.endDate)}</td>
                  <td className="py-2 px-4">{row.purpose}</td>
                  <td className="py-2 px-4">${row.grandTotal.toFixed(2)}</td>
                  {user && (
                    <>
                      <td className="py-2 px-4">{row.status}</td>
                      <td className="py-2 px-4">
                        {renderActionIcons(row.status, index)}
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={user ? 6 : 4} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default ShowCampaign;
