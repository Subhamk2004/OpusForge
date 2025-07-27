"use client"

import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

function NavLinkDiv({
    logo,
    icon,
    activeClass,
    inActiveClass,
    title,
    toHref,
    customClass
}) {
    let location = usePathname()

    return (
        <div className='w-full h-full flex flex-row items-end justify-center'>
            {
                location === toHref &&
                <div className='w-5 h-[50%] bg-light border-black'>
                    <div className='h-full w-full bg-s rounded-br-full'>
                    </div>
                </div>
            }
            <Link href={toHref}
                className={`flex items-center justify-center w-full ${location == toHref ? activeClass : inActiveClass} `}
            >
                <div className={`w-full flex flex-row items-center justify-center gap-2 ${customClass}`}>
                    {
                        logo &&
                        <Image src={logo} alt="logo1" className='w-8' />
                    }
                    <div className='overflow-hidden h-full flex flex-col items-center justify-center'>
                        {icon &&
                            <div className={`transition-all duration-500  ease-in-out ${location === toHref ? '-translate-y-0' : ' translate-y-10 w-0 h-0 opacity-0'}`}>
                                {icon}
                            </div>
                        }
                    </div>
                    {
                        title &&
                        <h1 className=''>{title}</h1>
                    }
                </div>

            </Link>
            {
                location === toHref &&
                <div className='w-5  h-[50%] bg-light border-black'>
                    <div className='h-full w-full bg-s rounded-bl-full'></div>
                </div>

            }
        </div>
    )
}

export default NavLinkDiv