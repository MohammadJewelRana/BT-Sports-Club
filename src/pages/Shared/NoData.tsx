 

const NoData = ({title,subTitle}) => {
  return (
    <div>

<div className="flex flex-col items-center justify-center h-full py-20">
      <svg
        className="w-16 h-16 mb-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 14l2-2 4 4m0 0l4-4m-4 4V4m0 6H4m8 0H8m0 0v6m0-6l-2-2m6 6l2 2"
        ></path>
      </svg>
      <h2 className="text-lg font-semibold text-gray-700"> {title}</h2>
      <p className="text-gray-500">There are no {subTitle}s to show at this time.</p>
    </div>
      
    </div>
  )
}

export default NoData
