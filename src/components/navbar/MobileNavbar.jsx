"use client"
import React, { useState } from 'react'
import logo1 from '@/assets/logo1.png'
import NavLinkDiv from './NavLinkDiv'
import { Info, InfoIcon, LogInIcon, Mail, Phone, PlusCircle, SendToBackIcon, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function MobileNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    let activeClass = 'bg-light p-3 w-full font-semibold rounded-lg'
    let inActiveClass = 'bg-s p-3 w-full font-[500] rounded-lg'

    return (
        <div className='w-full h-full flex flex-col bg-s relative'>
            {/* Mobile Header */}
            <div className='w-full h-full flex flex-row justify-between items-center px-4 py-2'>
                {/* Logo */}
                <Link href="/" className='flex items-center gap-2' onClick={closeMenu}>
                    <Image src={logo1} alt="logo1" className='w-8 h-8' />
                    <h1 className='font-semibold text-lg'>OpusForge</h1>
                </Link>

                {/* Hamburger Menu Button */}
                <button 
                    onClick={toggleMenu}
                    className='p-2 rounded-lg hover:bg-light transition-colors duration-200 z-50'
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <X size={24} className='text-black' />
                    ) : (
                        <Menu size={24} className='text-black' />
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div 
                    className='fixed inset-0 bg-black bg-opacity-50 z-40'
                    onClick={closeMenu}
                />
            )}

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 h-full w-80 bg-s shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                {/* Menu Header */}
                <div className='flex justify-between items-center p-4 border-b border-light'>
                    <div className='flex items-center gap-2'>
                        <Image src={logo1} alt="logo1" className='w-6 h-6' />
                        <h2 className='font-semibold'>Menu</h2>
                    </div>
                    <button 
                        onClick={closeMenu}
                        className='p-1 rounded-lg hover:bg-light transition-colors duration-200'
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Menu Items */}
                <div className='flex flex-col p-4 gap-3'>
                    {/* Navigation Links */}
                    <div className='flex flex-col gap-2 mb-6'>
                        <h3 className='text-sm font-medium text-gray-600 mb-2'>Navigation</h3>
                        
                        <Link 
                            href='/features' 
                            onClick={closeMenu}
                            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-light transition-colors duration-200`}
                        >
                            <SendToBackIcon size={20} />
                            <span>Features</span>
                        </Link>

                        <Link 
                            href='/about' 
                            onClick={closeMenu}
                            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-light transition-colors duration-200`}
                        >
                            <InfoIcon size={20} />
                            <span>About</span>
                        </Link>

                        <Link 
                            href='/contact' 
                            onClick={closeMenu}
                            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-light transition-colors duration-200`}
                        >
                            <Phone size={20} />
                            <span>Contact</span>
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className='flex flex-col gap-3 border-t border-light pt-4'>
                        <h3 className='text-sm font-medium text-gray-600 mb-2'>Account</h3>
                        
                        <Link 
                            href='/login' 
                            onClick={closeMenu}
                            className='flex items-center justify-center gap-2 bg-purple p-3 rounded-lg text-center font-medium hover:opacity-90 transition-opacity duration-200'
                        >
                            <LogInIcon size={20} />
                            <span>Login</span>
                        </Link>

                        <Link 
                            href='/signup' 
                            onClick={closeMenu}
                            className='flex items-center justify-center gap-2 bg-yellow p-3 rounded-lg text-center font-medium hover:opacity-90 transition-opacity duration-200'
                        >
                            <PlusCircle size={20} />
                            <span>Sign Up</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileNavbar