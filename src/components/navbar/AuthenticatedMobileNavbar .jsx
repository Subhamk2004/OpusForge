"use client"
import React, { useState } from 'react'
import logo1 from '@/assets/logo1.png'
import { LucideDatabaseZap, LucideFileStack, Menu, X, UserCircle2, Power } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

function AuthenticatedMobileNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    const handleLogout = () => {
        signOut({ callbackUrl: '/' })
        closeMenu()
    }

    return (
        <div className='w-full h-full flex flex-col bg-s relative'>
            {/* Mobile Header */}
            <div className='w-full h-full flex flex-row justify-between items-center px-4 py-2'>
                {/* Logo */}
                <Link href="/user" className='flex items-center gap-2' onClick={closeMenu}>
                    <Image src={logo1} alt="logo1" className='w-8 h-8' />
                    <h1 className='font-semibold text-lg'>Home</h1>
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
                            href='/user/profile' 
                            onClick={closeMenu}
                            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-light transition-colors duration-200`}
                        >
                            <UserCircle2 size={20} />
                            <span>Profile</span>
                        </Link>

                        <Link 
                            href='/user/templates' 
                            onClick={closeMenu}
                            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-light transition-colors duration-200`}
                        >
                            <LucideFileStack size={20} />
                            <span>Templates</span>
                        </Link>

                        <Link 
                            href='/user/assets' 
                            onClick={closeMenu}
                            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-light transition-colors duration-200`}
                        >
                            <LucideDatabaseZap size={20} />
                            <span>Assets</span>
                        </Link>
                    </div>

                    {/* Logout Button */}
                    <div className='flex flex-col gap-3 border-t border-light pt-4'>
                        <h3 className='text-sm font-medium text-gray-600 mb-2'>Account</h3>
                        
                        <button 
                            onClick={handleLogout}
                            className='flex items-center justify-center gap-2 bg-errorbg/80 hover:bg-errorbg p-3 rounded-lg text-center font-medium transition-colors duration-200'
                        >
                            <Power size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthenticatedMobileNavbar