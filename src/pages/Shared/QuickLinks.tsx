 
import { Link } from "react-router-dom"


const QuickLinks = () => {
 
  return (
    <div>
      
      <div className=" mt-8 ">
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <div className="flex  flex-wrap justify-start items-center gap-4">
              <Link
                to="/"
                className="bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md w-24 text-center"
              >
              Home
              </Link>
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
          </div>


    </div>
  )
}

export default QuickLinks
