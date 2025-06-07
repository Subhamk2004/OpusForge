import React from 'react';
import { useSearchParams } from 'next/navigation';

const DeploymentForm = ({ repoName, onRepoNameChange, onSubmit }) => {

  let portfolioId = useSearchParams().get('portfolioID');

  return (
    <div className="flex items-center gap-4">
      {
        portfolioId ?
          <span className="text-gray-500">Portfolio: {repoName}</span>
          :
          <input
            type="text"
            name="repoName"
            placeholder="Enter repo name"
            value={repoName}
            onChange={(e) => onRepoNameChange(e.target.value)}
            className="border p-2 rounded max-w-[200px]"
          />
      }
      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {
          portfolioId ? 'Update' : 'Create'
        }
      </button>
    </div>
  );
};

export default DeploymentForm;