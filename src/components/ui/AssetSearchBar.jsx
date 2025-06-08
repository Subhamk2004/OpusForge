import React, { useState } from 'react';
import { Search, Image, FileText, Link, Copy, Check, X } from 'lucide-react';

const AssetSearchBar = ({ searchQuery, searchResults, onSearch }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const getAssetIcon = (asset) => {
    const url = asset.url?.toLowerCase() || '';
    if (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png') || url.includes('.gif') || url.includes('.webp')) {
      return <Image className="w-4 h-4 text-blue-500" />;
    } else if (url.includes('.pdf')) {
      return <FileText className="w-4 h-4 text-red-500" />;
    } else {
      return <Link className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAssetPreview = (asset) => {
    const url = asset.url?.toLowerCase() || '';
    if (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png') || url.includes('.gif') || url.includes('.webp')) {
      return (
        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={asset.url}
            alt={asset.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="w-full h-full bg-gray-200 flex items-center justify-center hidden">
            <Image className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      );
    } else if (url.includes('.pdf')) {
      return (
        <div className="w-12 h-12 bg-red-50 rounded-md flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-red-500" />
        </div>
      );
    } else {
      return (
        <div className="w-12 h-12 bg-gray-50 rounded-md flex items-center justify-center flex-shrink-0">
          <Link className="w-6 h-6 text-gray-500" />
        </div>
      );
    }
  };

  const copyToClipboard = async (url, index) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const truncateUrl = (url, maxLength = 30) => {
    if (!url || url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          placeholder="Search assets..."
          type="text"
          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg max-w-[280px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-sm"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {searchResults.length > 0 && (
        <div className="absolute top-12 left-0 w-[400px] bg-white shadow-xl border border-gray-200 rounded-lg z-50 max-h-80 overflow-hidden">
          <div className='flex items-center justify-between p-4
           border-gray-100 relative'>
            <button
              onClick={() => onSearch('')}
              title="Clear Search" aria-label="Clear Search" className='flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-150'
            >
              <X className='absolute top-2 right-2 bg-black text-white p-1 rounded-full cursor-pointer' />
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {searchResults.map((asset, index) => (
              <div
                key={index}
                className="p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 last:border-b-0"
              >
                <div className="flex items-start gap-3">
                  {getAssetPreview(asset)}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getAssetIcon(asset)}
                      <h4 className="font-medium text-gray-900 text-sm truncate">
                        {asset.name || 'Unnamed Asset'}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-gray-500 truncate flex-1">
                        {truncateUrl(asset.url)}
                      </span>

                      <button
                        onClick={() => copyToClipboard(asset.url, index)}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors duration-150 flex-shrink-0"
                        title="Copy URL"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="w-3 h-3 text-green-600" />
                            <span className="text-green-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-gray-600" />
                            <span className="text-gray-600">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetSearchBar;