/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
import Swal from "sweetalert2";

interface TableRow {
  _id: string; // Added this line
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDelete = (id: string, status: string) => {
    console.log(id, status);

    const newStatus = { status };
    console.log(newStatus);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Make PATCH request to update notice status
          const response = await fetch(
            `https://bt-sports-backend.vercel.app/api/campaign/${id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newStatus), // Send the status in the request body
            }
          );

          console.log(response);

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const result = await response.json();
          console.log("Updated successfully:", result);

          // Show success alert
          Swal.fire({
            title: "Updated!",
            text: "Campaign has been updated.",
            icon: "success",
          });

          // Optionally refetch or update the state to reflect the change
          campaignRefetch();
        } catch (error) {
          console.error("Error updating notice:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to update the campaign. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const filteredCampaigns =
    activeTab === "ongoing"
      ? campaigns.filter((campaign) => campaign.status === "ongoing")
      : campaigns;

  const onGoingData = campaigns.filter(
    (campaign) => campaign.status === "ongoing"
  );

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
        <OnGoingCampaign
          onGoingData={onGoingData}
          campaignRefetch={campaignRefetch}
        />
      ) : (
        <>
          {filteredCampaigns?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-blue-400 text-center text-white ">
                    <th className="py-4 px-4">Start Date</th>
                    <th className="py-4 px-4">End Date</th>
                    <th className="py-4 px-4">Purpose</th>
                    <th className="py-4 px-4">Grand Total</th>
                    {user && (
                      <>
                        <th className="py-4 px-4">Status</th>
                        <th className="py-4 px-4">Action</th>
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
                        <td className="py-6 text-md px-4">
                          {formatDate(row.startDate)}
                        </td>
                        <td className="py-6 text-md px-4">
                          {formatDate(row.endDate)}
                        </td>
                        <td className="py-6 text-md px-4">{row.purpose}</td>
                        <td className="py-6 text-md px-4">
                          ${row.grandTotal.toFixed(2)}
                        </td>

                        {user && (
                          <>
                            <td className="py-6 text-md px-4">{row.status}</td>
                            <td className="py-6 text-md px-4 ">
                              <div className="flex gap-4 items-center justify-center">
                                {row.status === "pending" ? (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleDelete(row._id, "ongoing")
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faPlay}
                                        className="text-blue-600"
                                        title="ongoing"
                                      />
                                    </button>

                                    <button
                                      onClick={() =>
                                        handleDelete(row._id, "end")
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className="text-green-600"
                                        title="end"
                                      />
                                    </button>
                                  </>
                                ) : row.status === "end" ? (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleDelete(row._id, "pending")
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faHourglassHalf}
                                        className="text-yellow-600"
                                        title="pending"
                                      />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDelete(row._id, "ongoing")
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faPlay}
                                        className="text-blue-600"
                                        title="ongoing"
                                      />
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleDelete(row._id, "pending")
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faHourglassHalf}
                                        className="text-yellow-600"
                                        title="pending"
                                      />
                                    </button>

                                    <button
                                      onClick={() =>
                                        handleDelete(row._id, "end")
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className="text-green-600"
                                        title="end"
                                      />
                                    </button>
                                  </>
                                )}

                                <button
                                  onClick={() =>
                                    handleDelete(row._id, "delete")
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="text-red-600"
                                    title="delete"
                                  />
                                </button>
                              </div>
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
          ) : (
            <NoData title={"No Campaign Available"} subTitle={"campaign"} />
          )}
        </>
      )}
    </div>
  );
};

export default ShowCampaign;
