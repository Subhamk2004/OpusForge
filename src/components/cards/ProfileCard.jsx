import { BadgeCheckIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import github from '@/assets/github.png';

function ProfileCard({ data, stats }) {

  return (
    <div className='p-4 py-6 shadow-medium flex flex-col items-center rounded-3xl w-[310px] h-[300px] justify-center'>
      <div className='border-4 relative border-textPurple rounded-full p-1'>
        <Image
          src={data?.image}
          className='w-24 h-24 rounded-full'
          width={400}
          height={400}
          alt='profile photo'
        />
        <BadgeCheckIcon className='absolute right-0 -bottom-2 text-white w-8 h-8' fill='purple' />
      </div>
      <p className='mt-5 text-lg font-semibold'>
        {data.name}
      </p>
      <p className='text-sm text-texts'>
        ~ {data.profession || `developer`}
      </p>
      <div className='flex flex-row justify-around items-center gap-2 w-full mt-5'>
        <div className='flex flex-row items-center gap-1'>
          <div className='bg-green-400 w-2 h-2 rounded-full'></div>
          {
            stats.totalPortfolios < 3 ?
              `Beginner`
              :
              `Active Builder`
          }
        </div>
        <div className='p-2 bg-black text-white rounded-2xl px-4 flex flex-row items-center gap-1 hover:scale-105 active:scale-95 transition-all'>
          <Image
            src={github}
            className='w-5 h- 5'
          />
          <Link
            href={`https://github.com/${data.githubUsername}`}
            target='_blank'
            className='text-sm'
          >
            {data.githubUsername}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard