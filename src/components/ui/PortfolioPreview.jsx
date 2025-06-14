import React, { memo } from 'react';
import Portfolio from "@/components/other/Portfolio";

const PortfolioPreview = memo(({ userData, template, setHtml }) => {
  console.log('PortfolioPreview re-rendered');

  return (
    <div className="w-1/2 lg:w-[65%] pt-20 flex h-screen gap-4 text-black">
      <div className="preview-wrapper w-full h-full p-4 bg-gray-100 ">
        <div className="preview-header mb-4 text-sm text-gray-600">
          Live Preview
        </div>
        <div className="preview-content h-[calc(100%-2rem)] overflow-hidden rounded-xl">
          <Portfolio userData={userData} template={template} setHtml={setHtml} />
        </div>
      </div>
    </div>
  );
});

PortfolioPreview.displayName = 'PortfolioPreview';

export default PortfolioPreview;