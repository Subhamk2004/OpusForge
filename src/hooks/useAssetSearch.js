import { useState, useEffect } from 'react';

export const useAssetSearch = (loadedAssets) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      const results = loadedAssets.filter(asset =>
        asset.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  return {
    searchQuery,
    searchResults,
    handleSearch
  };
};