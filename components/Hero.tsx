import React from 'react';
import { Globe, TrendingDown, AlertTriangle } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="bg-indigo-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
         <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
         </svg>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
            Global Multidimensional Poverty Index
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-indigo-200 mb-10">
            Exploring deep disparities in poverty across regions. While some areas have virtually eliminated deprivation, others face entrenched structural challenges.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="bg-indigo-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3 border border-indigo-700">
              <div className="bg-rose-500 rounded-full p-2">
                <AlertTriangle size={20} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-xs text-indigo-300 uppercase font-semibold">Highest Poverty</p>
                <p className="text-lg font-bold">Sub-Saharan Africa</p>
              </div>
            </div>

            <div className="bg-indigo-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3 border border-indigo-700">
              <div className="bg-emerald-500 rounded-full p-2">
                <TrendingDown size={20} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-xs text-indigo-300 uppercase font-semibold">Lowest Poverty</p>
                <p className="text-lg font-bold">Europe & Central Asia</p>
              </div>
            </div>
            
             <div className="bg-indigo-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3 border border-indigo-700">
              <div className="bg-blue-500 rounded-full p-2">
                <Globe size={20} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-xs text-indigo-300 uppercase font-semibold">Global Coverage</p>
                <p className="text-lg font-bold">6 Major Regions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};