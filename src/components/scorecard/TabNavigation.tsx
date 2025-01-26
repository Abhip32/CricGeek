interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => (
  <div className="flex border-b p-2">
    {['scorecard', 'squads', 'details','commentary'].map((tab) => (
      <button
        key={tab}
        className={`flex-1 px-4 py-2 ${
          activeTab === tab
                       ? 'bg-red-600 text-white shadow-lg' 
                  : 'text-gray-800 bg-gray-200 hover:bg-gray-700/50 hover:text-white'
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </div>
); 