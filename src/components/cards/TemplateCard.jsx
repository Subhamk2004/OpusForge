import React from 'react'
import Image from "next/image";
import Link from "next/link"
import placeholder from "@/assets/placeholder.jpg";
import { EyeIcon, TextSelect } from 'lucide-react';

function TemplateCard({ template }, key) {
    let src = "";
    let finalSrc = "";
    if (!template.image.startsWith("http")) {
        finalSrc = placeholder;
    } else {
        src = template.image;
        finalSrc = src.trimEnd();
    }
    return (
        <div key={key} className="bg-white p-2 m-2 rounded-3xl shadow-lg w-full max-w-sm flex flex-col items-center justify-start hover:shadow-2xl transition-shadow duration-300">
            <Image
                src={finalSrc}
                alt={template.name}
                className="w-full h-48 object-cover rounded-2xl mb-4"
                width={350}
                height={200}
            />
            <div className='w-full flex flex-col p-1 px-4'>
                <h2 className="text-lg font-semibold mb-2">
                    {template.name}
                </h2>
                <p className='text-texts mb-4 text-xs line-clamp-2'>
                    {template.description}
                </p>
                <div className='flex flex-row gap-2 w-full justify-between items-center'>
                    <p className='bg-white text-black px-4 py-2 rounded-2xl hover:bg-purple-dark transition-colors duration-300 flex items-center justify-center'>
                        <span className='font-semibold mr-1'>
                            <TextSelect className='inline w-5 h-5 mr-1' />
                        </span>
                        {template.templateFor}
                    </p>
                    <Link
                        href={`/user/templates/viewTemplate?id=${template._id}`}
                        className="bg-black text-white px-4 py-2 rounded-2xl shadow-md hover:bg-purple-dark transition-colors duration-300 flex items-center justify-center"
                    >
                        <EyeIcon className="w-4 h-4 mr-2" />
                        View Template
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TemplateCard