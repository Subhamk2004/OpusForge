"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

function page() {
  const { user } = useSelector((state) => state.user);
  const { portfolios } = useSelector((state) => state.portfolios);
  let [show, setShow] = useState("flex");
  let [isLoaded, setIsLoaded] = useState(false);
  let [loadedPortfolios, setLoadedPortfolios] = useState([]);

  useEffect(() => {
    if (user !== undefined) {
      setIsLoaded(true);
    } if (portfolios !== undefined && portfolios.length > 0) {
      setLoadedPortfolios(portfolios);
    }
  }, [user, portfolios]);

  if (!isLoaded) {
    return (
      <div className='w-screen h-screen bg-light text-black flex items-center justify-center'>
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className='bg-light h-screen w-screen overflow-scroll text-black'>
      User dashboard page
      <Link
        href="/user/profile"
        className="flex ">
        Profile
      </Link>
      {
        loadedPortfolios.length > 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">Your Portfolios</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl p-4">
              {loadedPortfolios.map((portfolio) => (
                <Link
                  key={portfolio._id}
                  href={`/user/templates/viewTemplate?id=${portfolio.templateId}&portfolioID=${portfolio._id}`}
                  className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200"
                >
                  <h2 className="text-xl font-semibold">{portfolio.name}</h2>
                  <p className="text-gray-600">{portfolio.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-xl font-bold">No Portfolios Found</h1>
            <p className="text-gray-600">Create your first portfolio to get started!</p>
          </div>
        )
      }
    </div>
  )
}

export default page