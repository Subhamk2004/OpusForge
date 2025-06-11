import { GalleryHorizontal } from 'lucide-react'
import React from 'react'

function AssetOverviewCard({ stats }) {
    return (
        <div className=' p-5 w-[200px] h-[200px]  lg:w-[300px] lg:h-[300px]  border relative overflow-hidden rounded-3xl flex flex-col justify-between'>
            <div className='bg-blue-400 z-0 absolute w-3/5 h-4/5 blur-2xl rounded-full -top-7 -right-10'></div>
            <div className='bg-green-300/80 z-0 absolute w-4/5 h-full blur-xl rounded-3xl -rotate-12 top-10 -left-32'></div>
            <div className='w-full flex flex-row justify-between'>
                <p className='z-10 text-black text-xl fon-semibold'>
                    Total <br /> Assets
                </p>
                <div className='z-10 flex items-center justify-center relative p-3 backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg'>
                    <GalleryHorizontal className=' text-black' />
                </div>
            </div>
            <div className='flex items-end justify-start h-full'>
                <p className='z-10 text-black text-4xl font-bold'>
                    {stats.totalAssets}
                </p>
                <span className='text-sm mb-2 ml-1'>assets</span>
            </div>
        </div>
    )
}

export default AssetOverviewCard