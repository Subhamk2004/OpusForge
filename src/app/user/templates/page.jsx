"use client"
import Link from "next/link"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

function Page() {
  let { templates } = useSelector((state) => state.templates);
  let [foundTemplates, setFoundTemplates] = useState(templates);
  useEffect(() => {
    if (!templates) {
      console.log("No templates found");
    } else setFoundTemplates(templates[0]);
  }, [templates])
  console.log("Templates:", foundTemplates);

  return (
    <div className="flex w-full flex-col items-center justify-start min-h-screen bg-light">
      {
        foundTemplates ?
          <div>
            {
              foundTemplates.map((template, index) => (
                <div key={index} className="bg-white p-4 m-2 rounded-lg shadow-md w-full max-w-md">
                  <h2 className="text-xl font-bold">{template.name}</h2>
                  <p className="text-gray-700">{template.description}</p>
                  <Link href={`/user/templates/viewTemplate?id=${template._id}`} className="text-blue-500 underline mt-2 block">
                    View Template
                  </Link>
                </div>
              ))
            }
          </div> :
          <div className="loader flex flex-col items-center justify-center h-screen">
            <svg className="animate-spin h-10 w-10 text-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.364A8.003 8.003 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3.93-1.574zM12 20a8.003 8.003 0 01-6.364-2.93l-3.93 1.574A11.95 11.95 0 0012 24v-4zm6.364-2.93A8.003 8.003 0 0120 12h4c0 3.042-1.135 5.824-3 7.938l-3.636-1.568zM20 12a8.003 8.003 0 01-2.93 6.364l3.636 1.568A11.95 11.95 0 0024 12h-4z"></path>
            </svg>
            <p className="text-purple mt-4">Loading templates...</p>
          </div>
      }
      <div className="flex flex-col items-center justify-center bg-purple p-4 rounded-lg shadow-md underline">
        <Link href="/user/templates/addTemplate">
          Add Template
        </Link>
        <br />
        <Link href="/user/templates/viewTemplate">
          View Templates
        </Link>
      </div>
    </div>
  )
}

export default Page