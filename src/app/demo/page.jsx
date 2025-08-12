"use client"
import React, { Suspense, useEffect, useState } from 'react'
import Preview from '@/components/other/Preview'
import { useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import useDemo from '@/helper/demoTemplate'

function Page1() {
    let { templates, loading } = useDemo();
    // console.log(templates);
    let template = templates[1] || {};



    return (
        <div className='w-full h-full flex flex-col items-center justify-center relative'>
            <div className="absolute top-0 left-4 z-20">
                <Link href="/features" className="group flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-md border border-white/80 rounded-full text-black hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="font-medium hidden lg:block">Back to Features</span>
                </Link>
            </div>
            {loading ? (
                <div className="loader flex flex-col items-center justify-center h-screen">
                    <svg className="animate-spin h-10 w-10 text-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.364A8.003 8.003 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3.93-1.574zM12 20a8.003 8.003 0 01-6.364-2.93l-3.93 1.574A11.95 11.95 0 0012 24v-4zm6.364-2.93A8.003 8.003 0 0120 12h4c0 3.042-1.135 5.824-3 7.938l-3.636-1.568zM20 12a8.003 8.003 0 01-2.93 6.364l3.636 1.568A11.95 11.95 0 0024 12h-4z"></path>
                    </svg>
                    <p className="text-purple mt-4">Loading template...</p>
                </div>
            ) : null}

            <div className='mt-8'>
                <Preview
                    template={template}
                    demo={true}
                    existingPortfolioData={{}}
                />
            </div>
        </div>
    )
}

export default function page() {
    return (
        <Suspense>
            <Page1 />
        </Suspense>
    )
}