"use client"

import { ArrowUpRightFromCircleIcon } from 'lucide-react'
import React, { useState } from 'react'
import tempHero1 from '@/assets/tempHero1.png'
import tempHero2 from '@/assets/tempHero2.png'
import Image from 'next/image'

function Welcome({ setShowForm, setShowWelcome, showWelcome }) {
    return (
        <div className={`w-full max-w-8xl mt-10 bg-p/50 border rounded-2xl shadow-soft h-[75%] shadow-purple/70 ${showWelcome} flex items-center justify-center transition-all duration-300`}>
            <div className='w-full h-full relative flex flex-col lg:flex-row justify-between py-5 p-6'>
                <div className='flex h-full w-full items-center justify-between p-4 '>
                    <Image
                        src={tempHero2}
                        alt="Template Hero"
                        className='h-full w-full object-cover rounded-2xl'
                    />
                </div>
                <div className='w-full p-4 rounded-2xl bg-black text-white h-full flex flex-col items-center justify-center gap-4'>
                    <p className='text-2xl lg:text-3xl text-center'>
                        Create your own
                        <button
                            onClick={() => {
                                setShowForm("flex");
                                setShowWelcome("hidden");
                            }}
                            className='text-hoverbg ml-1 italic underline'>
                            <span className='text-hoverbg ml-1 italic underline'>
                                Style
                            </span>
                            <ArrowUpRightFromCircleIcon className='inline ml-2 w-5 h-5 text-hoverbg' />
                        </button>
                    </p>
                    <span className='text-texts text-justify px-5'>
                        Now you can create your own template with your own style and design. You can use the image above as a reference for your template design. You can also use the image below as a reference for your template design.
                    </span>
                    <div className='lg:flex items-center justify-between h-full p-4 hidden'>
                        <Image
                            src={tempHero1}
                            alt="Template Hero"
                            className=' object-cover rounded-lg'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome