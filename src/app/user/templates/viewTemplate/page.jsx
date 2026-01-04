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
        let isConfirming = false;

        const handleBeforeUnload = (event) => {
            if (isConfirming) return;
            
            isConfirming = true;
            event.preventDefault();
            
            setTimeout(() => {
                const confirmReload = window.confirm("Your work may be lost, as drafts aren't auto-saved. Proceed only if you believe your data is saved");
                if (!confirmReload) {
                    history.pushState(null, null, window.location.href);
                }
                isConfirming = false;
            }, 100);
            
            event.returnValue = "";
            return "";
        };

        const handlePopState = (event) => {
            if (isConfirming) return;
            
            const confirmLeave = window.confirm("Your work may be lost, as drafts aren't auto-saved. Proceed only if you believe your data is saved");
            if (!confirmLeave) {
                history.pushState(null, null, window.location.href);
            }
        };

        const handleKeyDown = (event) => {
            if ((event.ctrlKey && event.key === 'r') || (event.metaKey && event.key === 'r') || event.key === 'F5') {
                const confirmReload = window.confirm("Reloading will stop all the processes and you might lose your data, drafts are not saved as of now, do you still wanna proceed?");
                if (!confirmReload) {
                    event.preventDefault();
                    return false;
                }
            }
        };

        const handleLinkClick = (event) => {
            const link = event.target.closest('a');
            if (link && link.href) {
                const currentOrigin = window.location.origin;
                const linkUrl = new URL(link.href, currentOrigin);
                
                if (linkUrl.origin === currentOrigin && linkUrl.pathname !== window.location.pathname) {
                    const confirmLeave = window.confirm("Your work may be lost, as drafts aren't auto-saved. Proceed only if you believe your data is saved");
                    if (!confirmLeave) {
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    }
                }
            }
        };

        history.pushState(null, null, window.location.href);
        
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('click', handleLinkClick, true);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('click', handleLinkClick, true);
        };
    }, []);

    useEffect(() => {
        if (!templates || templates.length === 0) {
            setLoading(true);
        } else {
            setLoading(false);
            setTemplate(templates[0].find((temp) => temp._id === templateId) || {});
        }

        if (!portfolioId || portfolios.length === 0) {
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
            }
        }
    }, [templates, portfolios, templateId, portfolioId])

    return (
        <div className='w-full h-full flex flex-col items-center justify-center -mt-8 md:mt-0'>
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