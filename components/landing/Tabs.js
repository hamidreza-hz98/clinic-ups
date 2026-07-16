import { useState } from 'react';

export default function Tabs ({ tabs = [], orientation = 'horizontal' }) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={`tabs flex items-start flex-col md:flex-row md:gap-8`}>
      <div className={`tabs-box flex flex-col items-start justify-start items-center justify-center bg-black text-yellow-400 w-full md:w-auto md:min-w-64`}>
        {tabs.map((tab, index) => (
          <a
            key={index}
            className={`w-full block text-center py-4 cursor-pointer ${selectedTab === index ? 'tab-active bg-yellow-400 text-black' : ''}`}
            onClick={() => setSelectedTab(index)}
          >
            {tab.label}
          </a>
        ))}
      </div>

      <div className="w-full py-8">
        {tabs[selectedTab].content}
      </div>
    </div>
  );
};
