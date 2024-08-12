

const OnGoingCampaign = ({onGoingData}) => {
    console.log(onGoingData);
    
  return (
    <div>
        <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-center">
            
            <th className="py-2 px-4">Purpose</th>
            <th className="py-2 px-4">Grand Total</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {onGoingData.length ? (
            onGoingData.map((row, index) => (
              <tr
                key={index}
                className="text-center border-b hover:bg-gray-100 transition-colors"
              >
                
                <td className="py-2 px-4">{row.purpose}</td>
                <td className="py-2 px-4">${row.grandTotal.toFixed(2)}</td>
                <td className="py-2 px-4">{row.status}</td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>




    </div>
  )
}

export default OnGoingCampaign
