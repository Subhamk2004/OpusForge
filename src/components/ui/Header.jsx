import React from 'react';
import { useSearchParams } from 'next/navigation';
import AssetSearchBar from '@/components/ui/AssetSearchBar';
import DeploymentForm from '@/components/forms/DeploymentForm';
import { Briefcase, Sparkles, Code, Palette } from 'lucide-react';
import Root from '../AI/Root';

const Header = ({
  searchQuery,
  searchResults,
  onSearch,
  repoName,
  onRepoNameChange,
  onSubmit,
  demo,
  userData,
  onAIDataPopulated ,
}) => {
  const portfolioId = useSearchParams().get('portfolioID');
  const isUpdate = !!portfolioId;

  return (
    <div className={`w-full ${demo ? 'hidden' : ''} bg-white border-b border-b-texts border-gray-200 shadow-sm  `}>
      <div className="flex flex-col md:items-center p-4 md:pb-8 gap-4 ">

        <div className="flex w-[95%] items-center gap-3 justify-between">
          <div className="hidden md:flex items-center gap-2">
            <div className="p-2 bg-black rounded-lg shadow-md">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                Portfolio Builder
              </h1>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border">
            <div className={`w-2 h-2 rounded-full bg-green-400 ${isUpdate && 'bg-orange-400'} ${demo && 'bg-textPurple'}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {isUpdate && 'Edit Mode'}
              {demo && 'Demo Mode'}
              {!isUpdate && !demo && 'Create Mode'}
            </span>
            <Palette className="w-4 h-4 text-gray-500" />
          </div>
        </div>


        <div className={`${demo ? 'hidden' : ''} flex w-[95%] flex-row md:flex-row justify-between items-center gap-4 overflow-x-scroll overflow-y-hidden `}>
          <div className="flex flex-row  items-center gap-4 w-full ">
            <AssetSearchBar
              searchQuery={searchQuery}
              searchResults={searchResults}
              onSearch={onSearch}
              demo={demo}
            />
            <Root
              userData={userData}
              onAIDataPopulated={onAIDataPopulated}
            />
          </div>

          <DeploymentForm
            repoName={repoName}
            onRepoNameChange={onRepoNameChange}
            onSubmit={onSubmit}
            demo={demo}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;