"use client"
import React, { useState } from 'react'
import { Sparkles, Wand2, Code, Palette, Globe, Smartphone, FileText, Zap, ChevronRight, Edit3 } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import useDemo from '@/helper/demoTemplate'
import Link from 'next/link'
import PortfolioBuilderPage from '@/components/other/Preview'

function Page() {
    const [selectedCategory, setSelectedCategory] = useState('')
    const [prompt, setPrompt] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [proceed, setProceed] = useState(false);
    const [generatedTemplate, setGeneratedTemplate] = useState(null)

    const templateCategories = [
        {
            id: 'landing',
            name: 'Landing Page',
            icon: Globe,
            description: 'Modern landing pages for businesses and products',
            color: 'from-blue-50 to-blue-100 border-blue-200'
        },
        {
            id: 'portfolio',
            name: 'Portfolio',
            icon: Palette,
            description: 'Showcase your work and skills professionally',
            color: 'from-purple-50 to-purple-100 border-purple-200'
        },
        {
            id: 'dashboard',
            name: 'Dashboard',
            icon: Code,
            description: 'Admin panels and analytics dashboards',
            color: 'from-green-50 to-green-100 border-green-200'
        },
        {
            id: 'mobile',
            name: 'Mobile App',
            icon: Smartphone,
            description: 'Mobile-first designs and app interfaces',
            color: 'from-orange-50 to-orange-100 border-orange-200'
        },
        {
            id: 'blog',
            name: 'Blog/CMS',
            icon: FileText,
            description: 'Content management and blog layouts',
            color: 'from-indigo-50 to-indigo-100 border-indigo-200'
        },
        {
            id: 'ecommerce',
            name: 'E-commerce',
            icon: Zap,
            description: 'Online stores and product showcases',
            color: 'from-pink-50 to-pink-100 border-pink-200'
        }

    ]
    let { templates, loading } = useDemo();
    // console.log(templates);
    let template = templates[1] || {};
    // console.log(template);


    const handleGenerate = async () => {
        if (!selectedCategory || !prompt.trim()) return

        setIsGenerating(true)

        try {

            const response = await fetch('/api/AI/TemplateGenerator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    category: selectedCategory,
                    imageUrl: imageUrl || undefined,
                    sampleTemplate: template.htmlString || '',
                    sampleFormFields: template.formFields || []
                })
            });

            if (!response.ok) {
                throw new Error('Failed to generate template');
            }

            const data = await response.json();

            if (!data.template) {
                throw new Error('AI did not generate a valid template');
            }

            // console.log('Generated Template Data:', data.template);


            // Format the response to match our schema
            const formattedTemplate = {
                name: data.name || `AI Generated ${templateCategories.find(c => c.id === selectedCategory)?.name} Template`,
                htmlString: data.template,
                image: imageUrl || data.image || "",
                templateFor: selectedCategory,
                description: data.description || `A custom ${selectedCategory} template generated based on your requirements: "${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}"`,
                formFields: data.formFields || [],
                _id: 'ai_generated_' + Date.now()
            };

            setGeneratedTemplate(formattedTemplate);
        } catch (error) {
            console.error('Error generating template:', error);
            toast.error('Failed to generate template. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <div className="flex w-full flex-col items-center justify-start min-h-screen bg-light">
            {/* Header Section */}
            <div className="w-full bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                <div className="max-w-7xl mx-auto px-4 pt-3 pb-6 lg:py-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full shadow-lg">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                                AI Template Generator
                            </h1>
                            <p className="text-sm md:text-base text-texts max-w-2xl">
                                Describe your vision and let our AI create a custom template tailored to your needs.
                                Choose a category and provide detailed requirements for the best results.
                            </p>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span>Powered by AI</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {
                proceed ?
                    <div>
                        <PortfolioBuilderPage template={generatedTemplate}
                        existingPortfolioData={{}}
                        />
                    </div>
                    :
                    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
                        {/* Category Selection */}
                        <div className="space-y-6">
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-bold text-gray-900">Choose Template Category</h2>
                                <p className="text-texts">Select the type of template you want to generate</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {templateCategories.map((category) => {
                                    const IconComponent = category.icon
                                    return (
                                        <div
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`
                                        cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg
                                        ${selectedCategory === category.id
                                                    ? 'border-purple bg-purple shadow-md scale-105'
                                                    : `border-gray-200 bg-gradient-to-br ${category.color} hover:scale-102`
                                                }
                                    `}
                                        >
                                            <div className="flex flex-col items-center text-center space-y-3">
                                                <div className={`
                                            w-12 h-12 rounded-full flex items-center justify-center
                                            ${selectedCategory === category.id ? 'bg-white' : 'bg-white/80'}
                                        `}>
                                                    <IconComponent className="w-6 h-6 text-gray-700" />
                                                </div>
                                                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                                                <p className="text-sm text-texts leading-relaxed">{category.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Prompt Input */}
                        <div className="space-y-6">
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-bold text-gray-900">Describe Your Vision</h2>
                                <p className="text-texts">The more detailed your description, the better your template will be</p>
                            </div>

                            <div className="max-w-4xl mx-auto">
                                <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
                                    <div>
                                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                                            Template Image URL (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            id="imageUrl"
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full p-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent text-sm"
                                            disabled={isGenerating}
                                        />
                                    </div>

                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="Describe your ideal template in detail... For example: 'Create a modern landing page for a tech startup with a dark theme, animated hero section, pricing table, testimonials, and contact form. Use gradients and glassmorphism effects.'"
                                        className="w-full h-40 p-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent text-sm"
                                        disabled={isGenerating}
                                    />

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="text-sm text-texts">
                                            {prompt.length} characters
                                        </div>
                                        <button
                                            onClick={handleGenerate}
                                            disabled={!selectedCategory || !prompt.trim() || isGenerating}
                                            className={`
                                        px-8 py-3 rounded-2xl font-semibold flex items-center space-x-2 transition-all duration-300
                                        ${(!selectedCategory || !prompt.trim() || isGenerating)
                                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                    : 'bg-black text-white hover:bg-purple-dark shadow-md hover:shadow-lg active:scale-95'
                                                }
                                    `}
                                        >
                                            {isGenerating ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    <span>Generating...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Wand2 className="w-5 h-5" />
                                                    <span>Generate Template</span>
                                                    <ChevronRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Generated Template Preview */}
                        {generatedTemplate && (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-bold text-gray-900">Your AI Generated Template</h2>
                                    <p className="text-texts">Review your template details before proceeding</p>
                                </div>

                                <div className="max-w-2xl mx-auto">
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                                        {/* Template Image */}
                                        <div className="h-48 bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center">
                                            {generatedTemplate.image ? (
                                                <img
                                                    src={generatedTemplate.image}
                                                    alt={generatedTemplate.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-gray-400 flex flex-col items-center">
                                                    <Palette className="w-12 h-12 mb-2" />
                                                    <span>Template Preview</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Template Details */}
                                        <div className="p-6 space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">{generatedTemplate.name}</h3>
                                                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium mt-2">
                                                        {templateCategories.find(c => c.id === generatedTemplate.templateFor)?.name || 'Custom'}
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-gray-600">{generatedTemplate.description}</p>

                                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                                <div className="text-sm text-gray-500">
                                                    AI Generated Template
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setProceed(true);
                                                    }}
                                                    className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-purple-dark transition-colors"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                    <span>Proceed to Customize</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button
                                        onClick={() => {
                                            setGeneratedTemplate(null)
                                            setPrompt('')
                                            setImageUrl('')
                                            setSelectedCategory('')
                                        }}
                                        className="text-purple-600 hover:text-purple-800 font-medium text-sm transition-colors duration-200"
                                    >
                                        Generate Another Template
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
            }


            {/* Tips Section */}
            <div className="w-full max-w-4xl mx-auto px-4 pb-8">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-6 border border-purple-100">
                    <h3 className="font-semibold text-gray-900 mb-4 text-center">💡 Tips for Better Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-texts">
                        <div className="space-y-2">
                            <p>• Be specific about colors, layout, and style preferences</p>
                            <p>• Mention your target audience and use case</p>
                            <p>• Include desired sections and components</p>
                        </div>
                        <div className="space-y-2">
                            <p>• Specify responsive requirements</p>
                            <p>• Mention any animations or interactions</p>
                            <p>• Include brand or industry context</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-14"></div>
        </div>
    )
}

export default Page