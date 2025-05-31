"use client"
import { useEffect, useRef, useState, useCallback } from 'react';
import processTemplateString from '@/helper/normalToBackticks';

const Portfolio = ({ userData, templates }) => {
    const [processedHTML, setProcessedHTML] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const scriptsExecutedRef = useRef(false);

    const processTemplate = useCallback(() => {
        if (!userData || !templates) {
            setError('Missing userData or template data');
            setIsLoading(false);
            return;
        }

        try {
            const template = templates[0].htmlString;
            // console.log('Template content:', template);
            const processed = processTemplateString(template, {
                data: userData,
                ...userData
            });

            console.log('Template processed successfully');
            setProcessedHTML(processed);
            setError(null);
        } catch (err) {
            console.error('Template processing error:', err);
            setError('Failed to process template');
        } finally {
            setIsLoading(false);
        }
    }, [userData, templates]);
    console.log(processedHTML);

    useEffect(() => {
        setIsLoading(true);
        scriptsExecutedRef.current = false;
        processTemplate();
    }, [processTemplate]);

    const executeScripts = useCallback(() => {
        if (!containerRef.current || scriptsExecutedRef.current) return;

        const scriptTags = containerRef.current.querySelectorAll('script');

        scriptTags.forEach((script, index) => {
            try {
                console.log(`Executing script ${index + 1}`);

                const newScript = document.createElement('script');

                Array.from(script.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });

                if (script.innerHTML.trim()) {
                    newScript.innerHTML = `
            (function() {
              try {
                ${script.innerHTML}
              } catch (error) {
                console.error('Script execution error:', error);
              }
            })();
          `;
                }

                script.parentNode.replaceChild(newScript, script);

                console.log(`Script ${index + 1} executed successfully`);
            } catch (error) {
                console.error(`Error executing script ${index + 1}:`, error);
            }
        });

        scriptsExecutedRef.current = true;
    }, []);

    useEffect(() => {
        if (!processedHTML || !containerRef.current) return;

        const executeAfterRender = () => {
            requestAnimationFrame(() => {
                executeScripts();
            });
        };
        setLoad(true);
        const timer = setTimeout(executeAfterRender, 1500);
        const loadtimer = setTimeout(() => setLoad(false), 1000);
        return () => {
            clearTimeout(timer);
            clearTimeout(loadtimer);
        }
    }, [processedHTML, executeScripts]);

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
        <div className=''>
            {
                !load ?
                    <div className="portfolio-container w-full min-h-screen">
                        <div
                            ref={containerRef}
                            dangerouslySetInnerHTML={{ __html: processedHTML }}
                            className="w-full"
                        />
                    </div>
                    :
                    <div className='loader'>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading changes...</p>
                    </div>
            }
        </div>
    );
};

export default Portfolio;