"use client"
import React from 'react'
import DesktopNavbar from './DesktopNavbar'
import AuthenticatedDesktopNavbar from './AuthenticatedDesktopNavbar'
import { useSelector } from 'react-redux'

function Navbar() {
    const { isAuthenticated } = useSelector((state) => state.user)
    console.log("User in Navbar:", isAuthenticated);

    return (
        <div className='w-full h-[90px] px-6 pb-0 bg-s'>
            {
                isAuthenticated ?
                    <AuthenticatedDesktopNavbar />
                    :
                    <DesktopNavbar />
            }
        </div>
    )
}

export default Navbar