import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Heading from "../../Layout/Heading";
import useAuth from "../../utils/getUser";

const OnGoingCampaign = ({ onGoingData }) => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [paidAmount, setPaidAmount] = useState(null);
  const user=useAuth()

  // const handlePaidAmount = (id) => {
  //   setSelectedMemberId(id);
  //   document.getElementById("my_modal_6").checked = true;
  // };

  const onSubmit = (data) => {
    setPaidAmount(data.paidAmount);
    console.log("Paid Amount:", data.paidAmount);
    console.log("Selected Member ID:", selectedMemberId);

    // // Close the modal and reset the form
    // document.getElementById("my_modal_6").checked = false;
    

    reset();
  };

  return (
    <div>
      <Heading heading={"Ongoing Campaign"} />

      <div className="mb-12 mt-4">
        {onGoingData.map((item) => (
          <div key={item.id}>
            <div className="py-4 text-center">
              <h1 className="text-xl text-green-600 font-semibold">
                Campaign Purpose:{" "}
                <span className="text-green-800 capitalize">
                  {item?.purpose}
                </span>
              </h1>
            </div>
            <div className="overflow-x-auto mb-24">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-200 text-center">
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Amount</th>
                    <th className="py-2 px-4">Status</th>
                  {user &&    <th className="py-2 px-4">Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {item?.members.map((data) => (
                    <tr
                      key={data._id}
                      className="text-center border-b hover:bg-gray-100 transition-colors"
                    >
                      <td className="py-2 px-4">{data?.name}</td>
                      <td className="py-2 px-4">{data?.paidAmount}</td>
                      <td className="py-2 px-4">{data?.paymentStatus}</td>
                       {
                        user &&
                        <td className="py-2 px-4">
                        {data?.paymentStatus === "paid" ? (
                          <p className="text-green-600">Completed</p>
                        ) : (
                          <button   onClick={()=>setSelectedMemberId(data?._id)}>
                            <label htmlFor="my_modal_6" className="btn">
                              Pay
                            </label>
                          </button>
                        )}
                      </td>
                       }
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="float-right">
                <p className="font-bold text-gray-500 py-4 pr-8 text-lg">
                  Grand Total: <span>{item?.grandTotal}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold mb-4">Welcome for payment</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="paidAmount"
              >
                Amount
              </label>
              <input
                id="paidAmount"
                type="number"
                {...register("paidAmount", { required: true })}
                className="w-full p-2 border rounded mb-4"
                placeholder="Enter amount"
              />
            </div>
            <div className="modal-action">
              <button type="submit" className=" ">
                <label htmlFor="my_modal_6" className="btn">
                 Submit
                </label>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnGoingCampaign;
