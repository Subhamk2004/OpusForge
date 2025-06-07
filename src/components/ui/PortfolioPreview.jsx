// components/ui/PortfolioPreview.jsx
import React, { memo } from 'react';
import Portfolio from "@/components/other/Portfolio";

const PortfolioPreview = memo(({ userData, template, setHtml }) => {
  console.log('PortfolioPreview re-rendered'); // Debug log to track re-renders

  return (
    <div className="w-1/2 lg:w-[65%] flex h-screen gap-4 text-black overflow-scroll">
      <Portfolio userData={userData} template={template} setHtml={setHtml} />
    </div>
  );
});

PortfolioPreview.displayName = 'PortfolioPreview';

export default PortfolioPreview;