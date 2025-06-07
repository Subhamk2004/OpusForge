import React from 'react';
import AssetSearchBar from '@/components/ui/AssetSearchBar';
import DeploymentForm from '@/components/forms/DeploymentForm';

const Header = ({ 
  searchQuery, 
  searchResults, 
  onSearch, 
  repoName, 
  onRepoNameChange, 
  onSubmit 
}) => {
  return (
    <div className="w-full flex items-center gap-4 p-4 bg-primary text-black">
      <AssetSearchBar
        searchQuery={searchQuery}
        searchResults={searchResults}
        onSearch={onSearch}
      />
      <DeploymentForm
        repoName={repoName}
        onRepoNameChange={onRepoNameChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Header;