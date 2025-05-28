import React from 'react'
import logo1 from '@/assets/logo1.png'
import NavLinkDiv from './NavLinkDiv'
import { Info, InfoIcon, LogInIcon, LucideFileStack, Mail, Phone, PlusCircle, Power, SendToBackIcon, UserCircle2 } from 'lucide-react'
import { signOut } from 'next-auth/react'

function AuthenticatedDesktopNavbar() {
    let activeClass = 'rounded-t-3xl h-[60px] bg-light p-2 w-full font-semibold transition-height pb-0 duration-500 linear'
    let inActiveClass = 'rounded-t-3xl font-[500] bg-s p-2 w-full h-[0px] pb-8 transition-height duration-500 linear'

    return (
        <div className='w-full h-full flex flex-row bg-s pb-0 px-4 py-[10px] gap-8 justify-between'>
            <div className='w-[20%] flex justify-end items-end h-full '>
                <NavLinkDiv
                    logo={logo1}
                    activeClass={activeClass}
                    inActiveClass={inActiveClass}
                    title={"Home"}
                    toHref='/user'
                />
            </div>
            <div className='w-[50%] flex flex-row justify-center max-w-[500px] items-end h-full border-black '>
                <NavLinkDiv
                    title='Profile'
                    activeClass={activeClass}
                    inActiveClass={inActiveClass}
                    toHref='/user/profile'
                    icon={<UserCircle2 size={22} />}
                />
                <NavLinkDiv
                    title='Templates'
                    activeClass={activeClass}
                    inActiveClass={inActiveClass}
                    toHref='/user/templates'
                    icon={<LucideFileStack size={22} />}
                />
                <NavLinkDiv
                    title='Contact'
                    activeClass={activeClass}
                    inActiveClass={inActiveClass}
                    toHref='/contact'
                    icon={<Phone size={20} />}
                />
            </div>
            <div className='w-[25%] flex flex-row justify-end max-w-[350px] items-end h-full gap-3'>
                <button
                    className='bg-errorbg/80 hover:bg-errorbg 
                    p-3 rounded-2xl mb-2 flex flex-row items-center justify-center gap-2'
                    onClick={() => signOut({ callbackUrl: '/' })}
                >
                    <Power className='w-4 h-4' />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default AuthenticatedDesktopNavbar