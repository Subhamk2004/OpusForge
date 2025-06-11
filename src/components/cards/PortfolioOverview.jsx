import { BrickWallFireIcon } from 'lucide-react'
import React from 'react'

function PortfolioOverview({ stats }) {
    return (
        <div className=' p-5 w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] border relative overflow-hidden rounded-3xl flex flex-col justify-between'>
            <div className='bg-orange-400 z-0 absolute w-3/5 h-4/5 blur-2xl rounded-full -top-7 -right-10'></div>
            <div className='bg-purple/80 z-0 absolute w-3/5 h-4/5 blur-xl rounded-full top-0 -left-20'></div>
            <div className='bg-pink-400 z-0 absolute w-full h-3/5 blur-2xl rounded-full -bottom-32 -left-0'></div>
            <div className='w-full flex flex-row justify-between'>
                <p className='z-10 text-black text-xl fon-semibold'>
                    Total <br /> Portfolios
                </p>
                <div className='z-10 flex items-center justify-center relative p-3 backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg'>
                    <BrickWallFireIcon className=' text-black' />
                </div>
            </div>
            <div className='flex items-end justify-start h-full'>
                <p className='z-10 text-black text-4xl font-bold'>
                    {stats.totalPortfolios}
                </p>
                <span className='text-sm mb-2 ml-1'>portfolios</span>
            </div>
        </div>
    )
}

export default PortfolioOverview