"use client"
import React, { useState, useEffect } from 'react'
import ResumeParser from '../parser/Page';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';


const convertTableToStructuredString = (table) => {
    if (!table || !Array.isArray(table) || table.length === 0) {
        return "No resume data available";
    }

    const sections = {};
    let currentSection = "PROFILE";

    for (let i = 1; i < table.length; i++) {
        const [lineNumber, content] = table[i];

        if (content === "PROFILE" ||
            content === "Education" ||
            content === "Work Experience" ||
            content === "Projects" ||
            content === "Technical Skills" ||
            content === "Positions of Responsibility" ||
            content === "Achievements") {

            currentSection = content;
            if (!sections[currentSection]) {
                sections[currentSection] = [];
            }
        } else {
            if (!sections[currentSection]) {
                sections[currentSection] = [];
            }
            sections[currentSection].push(content);
        }
    }

    let resumeString = "RESUME DATA:\n\n";

    Object.entries(sections).forEach(([sectionName, sectionContent]) => {
        resumeString += `${sectionName}:\n`;
        sectionContent.forEach(line => {
            resumeString += `${line}\n`;
        });
        resumeString += `\n`;
    });

    return resumeString.trim();
};

function Root({ userData, onAIDataPopulated  }) {
    const { table } = useSelector((state) => state.slightParsedTableObj);
    const [resumeText, setResumeText] = useState("");
    const [showResumeParser, setShowResumeParser] = useState(false);
    let [loading, setLoading] = useState(false)
    let [populatedData, setPopulatedData] = useState({});

    useEffect(() => {
        if (table && table.length > 0) {
            const convertedText = convertTableToStructuredString(table);
            setResumeText(convertedText);
            // console.log('Resume as string:', convertedText);
        }
    }, [table]);
    // console.log(resumeText);


    let sendToAI = async () => {
        // console.log(resumeText);

        try {
            setLoading(true);
            let res = await fetch('/api/AI', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    resumeData: resumeText,
                    userData: userData
                })
            });

            if (!res.ok) {
                let errData = await res.json();
                toast.error(errData.error || 'Something went wrong while processing your resume.');
                throw new Error(errData.error || 'Network response was not ok');
            }

            let data = await res.json();
            setPopulatedData(data);
            if (onAIDataPopulated) {
                onAIDataPopulated(data);
            }
            toast.success("Resume processed successfully!");
            // console.log("parser Response:", data);
        } catch (error) {
            console.error("Error sending resume to parser:", error);
            if (!toast.isActive("parser-error")) {
                toast.error(error.message || "Unexpected error occurred", { toastId: "parser-error" });
            }
        } finally {
            setLoading(false);
        }
    };


    const handleAutoFillClick = () => {
        setShowResumeParser(true);
    };

    const closePopup = () => {
        setShowResumeParser(false);
    };

    return (
        <div>
            {/* <ToastContainer /> */}
            <button
                className={`${loading ? 'bg-hoverbg cursor-not-allowed' : 'bg-textPurple/80 hover:bg-textPurple'} text-light text-sm font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 text-nowrap`}
                onClick={handleAutoFillClick}
            >
                {
                    loading ? (
                        <span className="flex items-center gap-2">
                            <svg
                                className="animate-spin w-5 h-5 text-light"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                            Processing...
                        </span>
                    ) : <span className=''>Auto-fill with resume...</span>
                }

            </button>

            {showResumeParser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-light rounded-2xl p-8 shadow-hard w-full max-w-4xl max-h-[90vh] overflow-auto m-4 relative border border-border-light">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-purple rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-textPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-textp">Auto-fill with Resume</h2>
                                    <p className="text-texts text-sm">Upload your resume to automatically populate your portfolio</p>
                                </div>
                            </div>

                            <button
                                onClick={closePopup}
                                className="w-8 h-8 bg-s hover:bg-p text-textp rounded-lg transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="bg-p rounded-lg p-6 border border-border-light">
                            <ResumeParser />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                                onClick={() => {
                                    sendToAI();
                                    closePopup();
                                }}
                                className="flex-1 bg-textPurple hover:bg-purple text-light font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2"
                            >
                                Done
                            </button>
                            <button
                                onClick={closePopup}
                                className="flex-1 bg-s hover:bg-p text-textp font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Root