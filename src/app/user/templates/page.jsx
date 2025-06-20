"use client"
import TemplateCard from "@/components/cards/TemplateCard";
import { FilePlus2Icon, LayoutTemplate } from "lucide-react";
import Link from "next/link"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

function Page() {
  let { templates } = useSelector((state) => state.templates);
  let [foundTemplates, setFoundTemplates] = useState([]);

  useEffect(() => {
    if (!templates) {
      console.log("No templates found");
    } else setFoundTemplates(templates[0]);
  }, [templates])

  console.log("Templates:", foundTemplates);

  return (
    <div className="flex w-full flex-col items-center justify-start min-h-screen bg-light ">

      <div className="w-full bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 pt-3 pb-6 lg:py-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full shadow-lg">
              <LayoutTemplate className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                My Templates
              </h1>
              <p className="text-base text-texts max-w-2xl">
                Create, manage, and organize your templates. Get started quickly with pre-built designs or create something unique.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{foundTemplates?.length || 0} Templates</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {
        foundTemplates && foundTemplates.length > 0 ?
          <div className="flex flex-row flex-wrap items-center justify-center w-full p-4 gap-5 mt-8">
            {
              foundTemplates.map((template, index) => (
                <TemplateCard key={index} template={template} />
              ))
            }
          </div> :
          <div className="loader flex flex-col items-center justify-center h-screen">
            <p className="text-purple mt-4">Loading templates...</p>
          </div>
      }

      <Link href="/user/templates/addTemplate"
        className="flex flex-row items-center justify-center bg-purple p-3 lg:p-5 rounded-full shadow-xl absolute bottom-24 lg:bottom-28 right-6 gap-2
        hover:scale-105 active:scale-95 group transition-all "
      >
        <FilePlus2Icon className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
        <p className="text-textp font-semibold text-sm hidden group-hover:flex">Add New Template</p>
      </Link>
      <div className="p-14"></div>
    </div>
  )
}

export default Page