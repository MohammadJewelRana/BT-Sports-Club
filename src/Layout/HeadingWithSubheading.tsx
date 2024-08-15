/* eslint-disable @typescript-eslint/no-explicit-any */
 

const HeadingWithSubheading = ({heading,subheading}:any) => {
  return (
    <div>
         <div className="text-center py-8">
      <h1 className="capitalize text-4xl font-extrabold text-gray-900 mb-2">
       {heading}
      </h1>
      <p className="capitalize text-xl text-gray-600">
        ---  {subheading}---
      </p>
    </div>
    </div>
  )
}

export default HeadingWithSubheading
