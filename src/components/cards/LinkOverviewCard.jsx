import React from 'react'
import github from '@/assets/github1.png'
import leetcode from '@/assets/leetcode.png'
import gfg from '@/assets/gfg.png'
import cf from '@/assets/cf.webp'
import Image from 'next/image'
import Link from 'next/link'

function LinkOverviewCard({ data }) {
    const staticImages = [
        { name: 'Github', src: github },
        { name: 'Leetcode', src: leetcode },
        { name: 'GeeksforGeeks', src: gfg },
        { name: 'Codeforces', src: cf }
    ]

    const getImageData = (imageName) => {
        return data?.links?.find(link =>
            link.name.toLowerCase().includes(imageName.toLowerCase()) ||
            imageName.toLowerCase().includes(link.name.toLowerCase())
        )
    }

    return (
        <div className='p-4 px-6 w-full border relative overflow-hidden rounded-3xl bg-s flex flex-row justify-between items-center h-full lg:w-[300px] lg:h-[300px] lg:flex-col lg:justify-center lg:items-center lg:gap-8'>

            {/* Background decorative elements for lg screens */}
            <div className='hidden lg:block absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30'></div>
            <div className='hidden lg:block absolute bottom-6 left-6 w-12 h-12 bg-gradient-to-br from-pink-100 to-orange-100 rounded-full opacity-20'></div>
            <div className='hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-full opacity-10 -z-10'></div>

            <div className='flex flex-col gap-2 font-semibold lg:text-center lg:gap-4'>
                <span className='text-gray-800 lg:text-lg'>Links connected</span>
                <div className='flex items-center lg:flex-col lg:gap-2'>
                    <span className='text-xl font-bold text-gray-900 lg:text-4xl lg:font-black'>
                        {data?.links?.length || 0}
                    </span>
                    <span className='text-sm font-normal text-gray-600 ml-1 lg:ml-0 lg:text-base'>
                        active links
                    </span>
                </div>
            </div>

            <div className='flex flex-row gap-1 lg:mt-4'>
                <div className='flex flex-row lg:gap-2'>
                    {staticImages.slice(0, 4).map((item, index) => {
                        const linkData = getImageData(item.name)

                        return (
                            <div key={index} className='relative group -ml-3 first:ml-0 lg:ml-0 lg:hover:scale-125'>
                                {linkData ? (
                                    <Link
                                        href={linkData.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='block'
                                    >
                                        <div className='w-12 h-12 rounded-full bg-white border-2 border-s flex items-center justify-center hover:scale-110 hover:z-10 transition-all duration-300 cursor-pointer relative lg:w-16 lg:h-16 lg:shadow-lg lg:hover:shadow-xl'
                                            aria-label={`Link to ${item.name}`}
                                        >
                                            <Image
                                                src={item.src}
                                                alt={item.name}
                                                width={24}
                                                height={24}
                                                className='object-contain lg:w-8 lg:h-8'
                                            />
                                        </div>

                                        {/* Tooltip for lg screens */}
                                        <div className='hidden lg:block absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 shadow-lg'>
                                            {linkData.name}
                                            <div className='absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45'></div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className='w-12 h-12 rounded-full bg-white border-2 border-s flex items-center justify-center relative lg:w-16 lg:h-16 '>
                                        <Image
                                            src={item.src}
                                            alt={item.name}
                                            width={24}
                                            height={24}
                                            className='object-contain lg:w-8 lg:h-8'
                                        />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default LinkOverviewCard