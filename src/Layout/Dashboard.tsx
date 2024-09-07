/* eslint-disable @typescript-eslint/no-explicit-any */

import ImportantNotice from "../pages/Home/ImportantNotice";
import ImageGallery from "../pages/Home/ImageGallery";
import Campaign from "../pages/Campaign/Campaign";
import Member from "../pages/Member/Member";
import ApartmentPage from "../pages/Home/ApartmentPage";

import { totalCalculation } from "../utils/moneyCalculation";
import QuickLinks from "../pages/Shared/QuickLinks";
import BallLost from "../pages/Manage/BallLost";

const Dashboard = () => {
  const total = totalCalculation();
  console.log(total);
  const {
    grandTotalExpense,
    grandDepositAmount,
    remainingBalance,
    userLength,
  }: any = total;

  // console.log(totalExpense,grandDepositeAmount);

  //   const [campaignAll, allCampaignLoading, campaignRefetch] = useCampaign();
  // console.log(campaignAll);

  return (
    <div className=" ">
      {/* <Heading heading={"dashboard"}></Heading> */}
      <ImportantNotice></ImportantNotice>

      <div className=" border w-full bg-gray-200 p-4 mt-8">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Total Products Card */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-lg font-bold text-gray-800">
                Deposit Amount
              </h2>
              <p className="text-4xl font-extrabold text-blue-600">
                {grandDepositAmount}
              </p>
              {/* <p className="text-4xl font-extrabold text-blue-600">0</p> */}
            </div>

            {/* Total Orders Card */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-lg font-bold text-gray-800">Total Expense</h2>
              <p className="text-4xl font-extrabold text-green-600">
                {grandTotalExpense}
              </p>
              {/* <p className="text-4xl font-extrabold text-green-600">0</p> */}
            </div>

            {/* Total Orders Card */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-lg font-bold text-gray-800">
                {" "}
                Remaining Balance
              </h2>
              <p className="text-4xl font-extrabold text-green-600">
                {remainingBalance}
              </p>
            </div>

            {/* Total Users Card */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-lg font-bold text-gray-800">Total Users</h2>
              <p className="text-4xl font-extrabold text-yellow-600">
                {userLength}
              </p>
            </div>
          </div>

          {/* Optional: Add charts or graphs here */}

          {/* Quick links */}
          {/* <div className="mt-8 ">
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <div className="flex  flex-wrap justify-start items-center gap-4">
              <Link
                to="/campaign"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-24 text-center"
              >
              Campaign
              </Link>
              <Link
                to="/expense"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md w-24 text-center"
              >
                  Expense  
              </Link>
              <Link
                to="/notice"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md w-24 text-center"
              >
                 Notice   
              </Link>

              <Link
                to="/member"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-24 text-center"
              >
              Member
              </Link>
              <Link
                to="/gallery"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md w-24 text-center"
              >
                  Gallery  
              </Link>
            </div>
          </div> */}

          <QuickLinks></QuickLinks>
        </div>
      </div>

      <ImageGallery></ImageGallery>
      <div className="mt-24">
        <Campaign></Campaign>
      </div>
      <div className="mt-24">
        <BallLost status={'home'}></BallLost>
      </div>
      <div className="mt-24">
        <Member state={null}></Member>
      </div>
      <div className="mt-24">
        <ApartmentPage></ApartmentPage>
      </div>
    </div>
  );
};

export default Dashboard;
