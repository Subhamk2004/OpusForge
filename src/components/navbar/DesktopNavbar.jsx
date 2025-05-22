import React from 'react'
import logo1 from '@/assets/favicon.ico'
import NavLinkDiv from './NavLinkDiv'
import { Info, InfoIcon, LogInIcon, Mail, Phone, PlusCircle, SendToBackIcon } from 'lucide-react'

function DesktopNavbar() {
    let activeClass = 'rounded-t-3xl h-[60px] bg-light p-2 w-full font-semibold transition-height pb-0 duration-500 linear'
    let inActiveClass = 'rounded-t-3xl font-[500] bg-s p-2 w-full h-[0px] pb-8 transition-height duration-500 linear'

    return (
        <div className='w-full h-full flex flex-row bg-s pb-0 px-4 py-[10px] gap-8 justify-between'>
            <div className='w-[20%] flex justify-end items-end h-full '>
                <NavLinkDiv
                    logo={logo1}
                    activeClass={activeClass}
                    inActiveClass={inActiveClass}
                    title={"OpusForge"}
                    toHref='/'
                />
            </div>
            <div className='w-[50%] flex flex-row justify-center max-w-[500px] items-end h-full border-black '>
                <NavLinkDiv
                    title='Features'
                    activeClass={activeClass}
                    inActiveClass={inActiveClass}
                    toHref='/features'
                    icon={<SendToBackIcon size={22} />}
                />
                <NavLinkDiv
                    title='About'
                    activeClass={activeClass}
                    inActiveClass={inActiveClass}
                    toHref='/about'
                    icon={<InfoIcon size={22} />}
                />
                <NavLinkDiv
                    title='Contact'
                    activeClass={activeClass}
                    inActiveClass={inActiveClass}
                    toHref='/contact'
                    icon={<Phone size={20} />}
                />
            </div>
            <div className='w-[25%] flex flex-row justify-start max-w-[350px] items-end h-full gap-3'>
                <NavLinkDiv
                    title="Login"
                    activeClass={activeClass}
                    inActiveClass={inActiveClass}
                    toHref='/login'
                    customClass={'bg-purple p-2 px-3 rounded-3xl text-center'}
                    icon={<LogInIcon size={22} />}
                />
                <NavLinkDiv
                    title="Sign Up"
                    activeClass={activeClass}
                    inActiveClass={inActiveClass}
                    toHref='/signup'
                    customClass={'bg-yellow p-2 px-3 rounded-3xl text-center'}
                    icon={<PlusCircle size={22} />}
                />
            </div>
        </div>
    )
}

export default DesktopNavbar