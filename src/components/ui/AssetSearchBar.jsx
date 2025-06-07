import React from 'react';

const AssetSearchBar = ({ searchQuery, searchResults, onSearch }) => {
  return (
    <div className="relative">
      <input
        placeholder="Search assets"
        type="text"
        className="border p-2 rounded max-w-[200px]"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />

      {searchResults.length > 0 && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-10">
          <ul className="max-h-60 overflow-y-auto">
            {searchResults.map((asset, index) => (
              <ul className="p-2 border-b flex flex-col" key={index}>
                <li>{asset.name}</li>
                <li className="underline text-blue-500 hover:text-blue-700 cursor-pointer">
                  {asset.url}
                </li>
              </ul>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AssetSearchBar;