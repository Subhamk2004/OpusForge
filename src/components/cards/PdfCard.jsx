import React, { useState } from 'react'
import { FileText, Download, Calendar, User, ExternalLink, Copy, Check } from 'lucide-react'

function PdfCard({ asset }) {
  const [copied, setCopied] = useState(false)
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleDownload = (e) => {
    e.preventDefault()
    window.open(asset.url, '_blank')
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

      <div className='relative bg-gradient-to-br from-purple/20 to-hoverbg/20 h-48 flex items-center justify-center'>
        <div className='text-center'>
          <FileText className='w-16 h-16 text-textPurple mx-auto mb-2' />
          <span className='text-textPurple font-medium text-sm'>PDF Document</span>
        </div>
        

        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center'>
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
            <button
              onClick={handleDownload}
              className='bg-white rounded-full p-2 hover:bg-gray-50 shadow-md transition-colors'
              title='Download PDF'
            >
              <Download className='w-5 h-5 text-gray-700' />
            </button>
            <a 
              href={asset?.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className='bg-white rounded-full p-2 hover:bg-gray-50 shadow-md transition-colors'
              title='Open PDF'
            >
              <ExternalLink className='w-5 h-5 text-gray-700' />
            </a>
          </div>
        </div>
      </div>
      

      <div className='p-4'>
        <h3 className='font-semibold text-gray-800 text-lg mb-2 truncate'>
          {asset?.name || 'Untitled PDF'}.pdf
        </h3>
        
        {asset?.description && (
          <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
            {asset.description}
          </p>
        )}
        

        <div className='flex items-center justify-between text-xs text-gray-500 mb-3'>
          <div className='flex items-center gap-1'>
            <User className='w-3 h-3' />
            <span className='truncate max-w-[120px]'>
              {asset?.email?.split('@')[0] || 'Unknown'}
            </span>
          </div>
          <div className='flex items-center gap-1'>
            <Calendar className='w-3 h-3' />
            <span>{formatDate(asset?.createdAt)}</span>
          </div>
        </div>
        

        <div className='flex gap-2'>
          <button
            onClick={handleCopyUrl}
            className='flex-1 bg-purple hover:bg-hoverbg text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm'
          >
            {copied ? (
              <>
                <Check className='w-4 h-4' />
                Copied!
              </>
            ) : (
              <>
                <Copy className='w-4 h-4' />
                Copy URL
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className='flex-1 bg-black/80 hover:bg-black text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm'
          >
            <Download className='w-4 h-4' />
            Download
          </button>
        </div>
      </div>
    </div>
  )
}

export default PdfCard