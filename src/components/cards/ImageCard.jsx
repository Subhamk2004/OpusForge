import Image from 'next/image'
import React, { useState } from 'react'
import { Calendar, User, ExternalLink, Copy, Check } from 'lucide-react'

function ImageCard({ asset }) {
    const [copied, setCopied] = useState(false)

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const handleCopyUrl = async (e) => {
        e.preventDefault()
        try {
            await navigator.clipboard.writeText(asset?.url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy URL:', err)
        }
    }

    return (
        <div className='bg-white w-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group'>

            <div className='relative overflow-hidden'>
                <img
                    src={asset?.url || '/placeholder.png'}
                    alt={asset?.name || 'Image'}
                    className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
                />

                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center'>
                    <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2'>
                        <button
                            onClick={handleCopyUrl}
                            className='bg-white rounded-full p-2 hover:bg-gray-50 shadow-md transition-colors'
                            title='Copy URL'
                        >
                            {copied ? (
                                <Check className='w-5 h-5 text-green-600' />
                            ) : (
                                <Copy className='w-5 h-5 text-gray-700' />
                            )}
                        </button>
                        <a
                            href={asset?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='bg-white rounded-full p-2 hover:bg-gray-50 shadow-md transition-colors'
                            title='Open Image'
                        >
                            <ExternalLink className='w-5 h-5 text-gray-700' />
                        </a>
                    </div>
                </div>
            </div>


            <div className='p-4'>
                <h3 className='font-semibold text-gray-800 text-lg mb-2 truncate'>
                    {asset?.name || 'Untitled Image'}
                </h3>

                {asset?.description && (
                    <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
                        {asset.description}
                    </p>
                )}


                <div className='flex items-center justify-between text-xs text-gray-500 mb-3'>
                    <div className='flex items-center gap-1'>
                        <Calendar className='w-3 h-3' />
                        <span>{formatDate(asset?.createdAt)}</span>
                    </div>
                    <button
                        onClick={handleCopyUrl}
                        className='w-1/2 bg-black hover:bg-hoverbg text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2'
                    >
                        {copied ? (
                            <>
                                <Check className='w-4 h-4' />
                                URL Copied!
                            </>
                        ) : (
                            <>
                                <Copy className='w-4 h-4' />
                                Copy URL
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageCard