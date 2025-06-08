import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Upload, RefreshCw, Github, Edit3, Check, X } from 'lucide-react';

const DeploymentForm = ({ repoName, onRepoNameChange, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempRepoName, setTempRepoName] = useState(repoName);
  const [isLoading, setIsLoading] = useState(false);

  let portfolioId = useSearchParams().get('portfolioID');
  const isUpdate = !!portfolioId;

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmit();
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      onRepoNameChange(tempRepoName);
    } else {
      setTempRepoName(repoName);
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setTempRepoName(repoName);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-3">
      {isUpdate ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
            <div className='flex items-center gap-1 text-gray-600 font-medium text-sm'>
              <Github className="w-4 h-4 text-gray-600" />
              Repo:
            </div>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempRepoName}
                  onChange={(e) => setTempRepoName(e.target.value)}
                  className="bg-white border border-gray-200 px-2 py-1 rounded text-sm min-w-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={handleEditToggle}
                  className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                  title="Save changes"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Cancel editing"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium text-sm">
                  {repoName || 'No repository name'}
                </span>

              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative">
          <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            name="repoName"
            placeholder="Enter repository name"
            value={repoName}
            onChange={(e) => onRepoNameChange(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg max-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-sm"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading || (!repoName.trim() && !isUpdate)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm
          ${isUpdate
            ? 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-md'
            : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-md'
          }
          ${(isLoading || (!repoName.trim() && !isUpdate))
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:transform hover:scale-105'
          }
        `}
      >
        {isLoading ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>{isUpdate ? 'Updating...' : 'Creating...'}</span>
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            <span>{isUpdate ? 'Update Portfolio' : 'Create Portfolio'}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default DeploymentForm;