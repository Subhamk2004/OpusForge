'use client';
import { useState } from 'react';

export default function FeedbackModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.message.trim()) {
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ title: '', message: '' });
                setTimeout(() => {
                    onClose();
                    setSubmitStatus(null);
                }, 7000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({ title: '', message: '' });
        setSubmitStatus(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-100 animate-in zoom-in-95 duration-300">
                <div className="relative bg-gradient-to-r from-gray-900 to-black text-white p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Send Feedback</h2>
                            <p className="text-gray-300 text-sm mt-1">We value your input</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="text-gray-300 hover:text-white transition-all duration-200 hover:bg-white hover:bg-opacity-20 rounded-full p-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-6 rounded-r-lg">
                        <div className="flex items-start">
                            <svg
                                className="w-5 h-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div>
                                <p className="text-sm font-medium text-gray-800">Important Notice</p>
                                <p className="text-xs text-gray-600 mt-1">
                                    Please provide only genuine feedback to help us improve. Avoid sending unnecessary or spam messages.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
                                Feedback Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                placeholder="Brief title for your feedback"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={6}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-vertical transition-all duration-200 bg-gray-50 hover:bg-white"
                                placeholder="Share your thoughts, suggestions, or report issues..."
                                required
                            />
                        </div>

                        {submitStatus === 'error' && (
                            <div className="p-4 bg-gray-900 border border-gray-700 text-white rounded-xl animate-in slide-in-from-top duration-300">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    Please fill in all fields or try again later.
                                </div>
                            </div>
                        )}

                        {submitStatus === 'success' && (
                            <div className="p-4 bg-gray-900 border border-gray-700 text-white rounded-xl animate-in slide-in-from-top duration-300">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Thank you for your feedback! We'll review it carefully.
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 px-6 py-3 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-xl transition-all duration-200 font-medium hover:shadow-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-3 bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white rounded-xl transition-all duration-200 font-medium hover:shadow-lg disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </div>
                                ) : (
                                    'Submit Feedback'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}