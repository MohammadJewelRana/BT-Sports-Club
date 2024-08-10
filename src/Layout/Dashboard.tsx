import { Link } from "react-router-dom";
import Heading from "./Heading";

const Dashboard = () => {
  const totalProducts = 500;
  const totalOrders = 200;
  const totalUsers = 1000;
 
  return (
    <div className=" ">
      <Heading heading={"dashboard"}></Heading>

      <div className=" border w-full bg-gray-200 p-4 mt-8">

      <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Products Card */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-bold text-gray-800">Deposit Amount</h2>
          <p className="text-4xl font-extrabold text-blue-600">{totalProducts}</p>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-bold text-gray-800">Total Expense</h2>
          <p className="text-4xl font-extrabold text-green-600">{totalOrders}</p>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-bold text-gray-800">   Remaining Balance</h2>
          <p className="text-4xl font-extrabold text-green-600">{totalOrders}</p>
        </div>

        {/* Total Users Card */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-bold text-gray-800">Total Users</h2>
          <p className="text-4xl font-extrabold text-yellow-600">{totalUsers}</p>
        </div>
 
      </div>

      {/* Optional: Add charts or graphs here */}
      

      {/* Quick links */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Quick Links</h2>
        <div className="flex space-x-4">
          <Link to="/products" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Manage Products</Link>
          <Link to="/orders" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">View Orders</Link>
          <Link to="/users" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md">Manage Users</Link>
        </div>
      </div>
    </div>


      </div>



    </div>
  );
};

export default Dashboard;
