interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => (
  <div className="flex border-b mb-4">
    {['scorecard', 'squads', 'details','commentary'].map((tab) => (
      <button
        key={tab}
        className={`flex-1 px-4 py-2 bg-gray-800 ${
          activeTab === tab
            ? 'border-b-2 bg-white text-zinc-950 font-bold'
            : 'bg-zinc-950 text-white'
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </div>
); 