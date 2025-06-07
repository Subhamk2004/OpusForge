"use client"
import React, { Suspense, useEffect, useState } from 'react'
import Preview from '@/components/other/Preview'
import { useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'

function Page1() {
    const searchParams = useSearchParams()
    const templateId = searchParams.get('id')
    const portfolioId = searchParams.get('portfolioID');
    const templates = useSelector((state) => state.templates.templates);
    const portfolios = useSelector((state) => state.portfolios.portfolios);

    let [template, setTemplate] = useState({});
    let [portfolio, setPortfolio] = useState({});
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!templates || templates.length === 0) {
            console.log("No templates found");
            setLoading(true);
        } else {
            setLoading(false);
            setTemplate(templates[0].find((temp) => temp._id === templateId) || {});
        }

        if (!portfolioId || portfolios.length === 0) {
            console.log("No portfolios found or portfolioId not provided");
            setLoading(false);
            setPortfolio({});
        } else {
            const foundPortfolio = portfolios.find((port) => port._id === portfolioId);
            if (foundPortfolio) {
                setPortfolio(foundPortfolio);
                setTemplate(prevTemplate => ({
                    ...prevTemplate,
                    portfolio: foundPortfolio
                }));
            } else {
                console.log("Portfolio not found");
            }
        }
    }, [templates, portfolios, templateId, portfolioId])

    console.log("portfolio", portfolio);

    return (
        <div>
            {loading ? (
                <div className="loader flex flex-col items-center justify-center h-screen">
                    <svg className="animate-spin h-10 w-10 text-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.364A8.003 8.003 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3.93-1.574zM12 20a8.003 8.003 0 01-6.364-2.93l-3.93 1.574A11.95 11.95 0 0012 24v-4zm6.364-2.93A8.003 8.003 0 0120 12h4c0 3.042-1.135 5.824-3 7.938l-3.636-1.568zM20 12a8.003 8.003 0 01-2.93 6.364l3.636 1.568A11.95 11.95 0 0024 12h-4z"></path>
                    </svg>
                    <p className="text-purple mt-4">Loading template...</p>
                </div>
            ) : null}

            {!loading && templateId ? (
                <Preview
                    template={template}
                    portfolioId={portfolioId}
                    existingPortfolioData={portfolio || {}}
                />
            ) : null}

            {!loading && !templateId ? (
                <div className='flex justify-center items-center'>
                    <h1 className='text-xl font-bold'>No Template ID provided</h1>
                </div>
            ) : null}
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