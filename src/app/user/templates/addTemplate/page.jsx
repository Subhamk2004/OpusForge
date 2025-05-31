"use client"

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import Welcome from '@/components/template/Welcome'
import AddTemplate from '@/components/forms/AddTemplate'

function page() {
    let [showForm, setShowForm] = useState("hidden");
    let [showWelcome, setShowWelcome] = useState("flex");

    return (
        <div className='w-full flex flex-col items-center justify-start h-screen relative '>
            <div className="absolute top-0 left-0 z-20">
                <Link href="/user/templates" className="group flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-md border border-white/80 rounded-full text-black hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="font-medium hidden lg:block">Back to Templates</span>
                </Link>
            </div>
            <h1 className='text-3xl font-semibold text-center '>
                Add New
                <span className='text-hoverbg'> Template</span>
            </h1>
            <Welcome
                setShowForm={setShowForm}
                setShowWelcome={setShowWelcome}
                showWelcome={showWelcome}
            />
            <AddTemplate 
                showForm={showForm}
            />
        </div>
    )
}

export default page