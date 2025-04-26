import { useState } from 'react';
import { HomeIcon, BarChartIcon, BriefcaseIcon } from 'lucide-react';

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('home');
  
  const menuItems = [
    { id: 'home', label: 'HOME', icon: <HomeIcon size={20} /> },
    { id: 'reports', label: 'REPORTS', icon: <BarChartIcon size={20} /> },
    { id: 'jobs', label: 'JOBS', icon: <BriefcaseIcon size={20} /> }
  ];
  
  return (
    <div className="h-screen w-64 bg-white border-r border-slate-200 flex flex-col ">
      {/* Logo or App Name Area */}
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-slate-700">Dashboard</h2>
      </div>
      
      {/* Navigation Items */}
      <nav className="flex-1 pt-6">
        <ul>
          {menuItems.map(item => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActiveItem(item.id)}
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeItem === item.id 
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="mr-3 text-current">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Footer Area - Optional */}
      <div className="mt-auto p-4 border-t border-slate-200">
        <div className="flex items-center text-sm text-slate-500">
          <div className="w-8 h-8 rounded-full bg-slate-300 mr-2"></div>
          <span>Admin User</span>
        </div>
      </div>
    </div>
  );
}