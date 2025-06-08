import React from 'react';
import { useSearchParams } from 'next/navigation';
import AssetSearchBar from '@/components/ui/AssetSearchBar';
import DeploymentForm from '@/components/forms/DeploymentForm';
import { Briefcase, Sparkles, Code, Palette } from 'lucide-react';

const Header = ({
  searchQuery,
  searchResults,
  onSearch,
  repoName,
  onRepoNameChange,
  onSubmit
}) => {
  const portfolioId = useSearchParams().get('portfolioID');
  const isUpdate = !!portfolioId;

  return (
    <div className="w-full bg-white border-b border-b-texts border-gray-200 shadow-sm">
      <div className="flex flex-col items-center p-4 pb-8 gap-4">

        <div className="flex w-[95%] items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-black rounded-lg shadow-md">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                Portfolio Builder
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border">
            <div className={`w-2 h-2 rounded-full ${isUpdate ? 'bg-orange-400' : 'bg-green-400'}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {isUpdate ? 'Edit Mode' : 'Create Mode'}
            </span>
            <Palette className="w-4 h-4 text-gray-500" />
          </div>
        </div>


        <div className="flex w-[95%] flex-row flex-wrap justify-between items-center gap-4 ">
          <div className="">
            <AssetSearchBar
              searchQuery={searchQuery}
              searchResults={searchResults}
              onSearch={onSearch}
            />
          </div>

          <DeploymentForm
            repoName={repoName}
            onRepoNameChange={onRepoNameChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;