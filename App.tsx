import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { RegionalCharts } from './components/RegionalCharts';
import { RegionCards } from './components/RegionCards';
import { TopCountries } from './components/TopCountries';
import { Narrative } from './components/Narrative';
import { Visualizer } from './components/Visualizer';
import { DataBrowser } from './components/DataBrowser';
import { BarChart3, Globe2, BookOpen, Database, PieChart } from 'lucide-react';
import { TabItem } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs: TabItem[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'visualizer', label: 'Visualiser', icon: PieChart },
    { id: 'data', label: 'Raw Data', icon: Database },
    { id: 'regions', label: 'Analysis', icon: Globe2 },
    { id: 'report', label: 'Report', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Globe2 className="h-8 w-8 text-indigo-600 mr-3" />
              <span className="font-bold text-xl tracking-tight text-slate-800">DataVoyager</span>
            </div>
            <div className="hidden sm:flex space-x-8">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                                activeTab === tab.id 
                                ? 'border-indigo-500 text-slate-900' 
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                        >
                            <Icon size={16} className="mr-2" />
                            {tab.label}
                        </button>
                    )
                })}
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div className="sm:hidden flex justify-around border-t border-slate-200 bg-white p-2">
             {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`p-2 rounded-lg flex flex-col items-center flex-1 ${activeTab === tab.id ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'}`}
                    >
                        <Icon size={20} />
                        <span className="text-[10px] mt-1">{tab.label}</span>
                    </button>
                )
            })}
        </div>
      </nav>

      <div className="pt-6">
      {activeTab === 'overview' && (
        <>
            <div className="-mt-6">
                <Hero />
            </div>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <RegionalCharts />
                        <RegionCards />
                    </div>
                    <div className="space-y-8">
                        <TopCountries />
                        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
                           <h3 className="font-bold text-lg mb-4 text-slate-800">What is MPI?</h3>
                           <p className="text-sm text-slate-600 mb-4">
                             The Global Multidimensional Poverty Index (MPI) is a key international resource that measures acute multidimensional poverty across more than 100 developing countries.
                           </p>
                           <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                             <li><strong>Headcount Ratio:</strong> The percentage of people who are poor.</li>
                             <li><strong>Intensity:</strong> The average percentage of dimensions in which poor people are deprived.</li>
                             <li><strong>MPI:</strong> Headcount × Intensity.</li>
                           </ul>
                        </div>
                    </div>
                </div>
            </main>
        </>
      )}

      {activeTab === 'visualizer' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-900">Interactive Visualiser</h1>
                <p className="text-slate-600">Explore relationships between poverty incidence and intensity.</p>
            </div>
            <Visualizer />
        </main>
      )}

      {activeTab === 'data' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-900">Raw Data Browser</h1>
                <p className="text-slate-600">Browse, filter, and export the underlying dataset.</p>
            </div>
            <DataBrowser />
        </main>
      )}

      {activeTab === 'regions' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Detailed Regional Analysis</h1>
                <p className="text-lg text-slate-600">Comparing poverty incidence and intensity across six major global regions.</p>
             </div>
             <RegionalCharts />
             <div className="mt-12">
                <RegionCards />
             </div>
        </main>
      )}

      {activeTab === 'report' && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Comprehensive Report</h1>
                <p className="text-lg text-slate-600">A detailed interpretation of the latest global statistics.</p>
             </div>
             <Narrative />
        </main>
      )}
      </div>

      <footer className="bg-white border-t border-slate-200 mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400 text-sm">
            Data derived from global MPI analysis. 2014-2023 Survey Data.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;