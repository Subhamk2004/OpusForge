import React from 'react'
import hero1 from '../../assets/hero1.png'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightFromLineIcon } from 'lucide-react'

function Hero4() {
    return (
        <div className='w-full max-w-6xl flex flex-col items-center no-scrollbar mt-10'>
            <h2 className='text-3xl lg:text-5xl font-semibold text-center lg:mt-10'>
                Get Started
            </h2>
            <div className='w-full rounded-3xl flex flex-row items-center gap-3 justify-between p-8 '>
                <div className='w-[50%] bg-p relative p-6 rounded-3xl flex flex-col items-center'>
                    <p className='text-lg lg:text-xl lg:font-semibold'>
                        Sign up for OpusForge and start building your portfolio today!
                    </p>
                    <span className='text-sm lg:text-base text-texts mt-2'>
                        Signup and start showcasing your skills and projects to the world, using our easy-to-use platform.
                    </span>
                    <Link
                        href="/signup"
                        className='bg-purple text-black w-full font-semibold rounded-3xl p-4 mt-4 hover:bg-hoverbg transition-all duration-300 flex flex-row items-center justify-between'
                    >
                        Sign Up
                        <ArrowRightFromLineIcon className='ml-2' />
                    </Link>
                </div>
                <div className='w-[50%] relative rounded-3xl flex flex-col items-center h-full justify-between'>
                    <div className=' w-full h-[48%]'>
                        <Link
                            href="/login"
                            className='bg-yellow/70 text-black h-full w-full font-semibold rounded-3xl p-4 hover:bg-yellow transition-all duration-300 flex flex-row items-center justify-between'
                        >
                            Already registered?
                            <ArrowRightFromLineIcon className='ml-2' />
                        </Link>
                    </div>
                    <div className=' w-full h-[48%]'>
                        <Link
                        href="/features"
                        className='bg-textp text-light h-full w-full font-semibold rounded-3xl p-4  hover:bg-black transition-all duration-300 flex flex-row items-center justify-between'>
                            Explore all features
                            <ArrowRightFromLineIcon className='ml-2' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero4