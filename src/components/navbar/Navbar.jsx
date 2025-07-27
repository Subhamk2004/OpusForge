"use client"
import React from 'react'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'
import AuthenticatedDesktopNavbar from './AuthenticatedDesktopNavbar'
import AuthenticatedMobileNavbar from './AuthenticatedMobileNavbar '
import { useSelector } from 'react-redux'

function Navbar() {
    const { isAuthenticated } = useSelector((state) => state.user)
    console.log("User in Navbar:", isAuthenticated);
    
    return (
        <div className='w-full h-[60px] md:h-[90px] px-6 pb-0 bg-s'>
            {/* Desktop Navigation - Hidden on mobile */}
            <div className='hidden md:block h-full'>
                {
                    isAuthenticated ?
                        <AuthenticatedDesktopNavbar />
                        :
                        <DesktopNavbar />
                }
            </div>
            
            {/* Mobile Navigation - Hidden on desktop */}
            <div className='block md:hidden h-full'>
                {
                    isAuthenticated ?
                        <AuthenticatedMobileNavbar />
                        :
                        <MobileNavbar />
                }
            </div>
        </div>
    )
}

export default Navbar