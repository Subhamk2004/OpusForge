"use client"
import { useEffect, useRef, useState, useCallback } from 'react';
import processTemplateString from '@/helper/normalToBackticks';

const Portfolio = ({ userData, template: newTemp, setHtml }) => {
    const [processedHTML, setProcessedHTML] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(null);
    const iframeRef = useRef(null);

    const processTemplate = useCallback(() => {
        if (!userData || !newTemp) {
            setError('Missing userData or template data');
            setIsLoading(false);
            return;
        }

        try {
            const template = newTemp.htmlString;
            const processed = processTemplateString(template, {
                data: userData,
                ...userData
            });

            const fullHTML = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Portfolio Preview</title>
                    <style>
                        html, body {
                            margin: 0;
                            padding: 0;
                            width: 100%;
                            height: 100%;
                            overflow-x: hidden;
                        }
                        
                        * {
                            box-sizing: border-box;
                        }
                        
                        header {
                            position: relative !important;
                            width: 100% !important;
                            top: 0 !important;
                            left: 0 !important;
                            right: 0 !important;
                        }
                    </style>
                </head>
                <body>
                    ${processed}
                </body>
                </html>
            `;

            console.log('Template processed successfully');
            setProcessedHTML(fullHTML);
            setHtml(processed);
            setError(null);
        } catch (err) {
            console.error('Template processing error:', err);
            setError('Failed to process template');
        } finally {
            setIsLoading(false);
        }
    }, [userData, newTemp]);

    useEffect(() => {
        setIsLoading(true);
        processTemplate();
    }, [processTemplate]);

    useEffect(() => {
        if (processedHTML && iframeRef.current) {
            const iframe = iframeRef.current;
            
            const blob = new Blob([processedHTML], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            
            iframe.onload = () => {
                URL.revokeObjectURL(url);
            };
            
            iframe.src = url;
        }
    }, [processedHTML]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading portfolio template...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Template Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => {
                            setError(null);
                            setIsLoading(true);
                            processTemplate();
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="portfolio-preview-container">
            {!load ? (
                <div className="portfolio-container w-full h-full border border-gray-300 rounded-lg overflow-hidden bg-white shadow-inner">
                    <iframe
                        ref={iframeRef}
                        className="w-full h-full border-none"
                        sandbox="allow-scripts allow-same-origin"
                        title="Portfolio Preview"
                        style={{
                            minHeight: '600px',
                            backgroundColor: 'white'
                        }}
                    />
                </div>
            ) : (
                <div className='loader'>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading changes...</p>
                </div>
            )}
        </div>
    );
};

export default Portfolio;