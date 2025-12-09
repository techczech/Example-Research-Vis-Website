import React from 'react';
import { REGIONAL_DATA } from '../constants';
import { MapPin, Users, Activity, Info } from 'lucide-react';

export const RegionCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {REGIONAL_DATA.map((region) => (
        <div key={region.name} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-slate-100 flex flex-col">
          <div className="p-6 flex-grow">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="text-indigo-500" size={20} />
              <h3 className="font-bold text-lg text-slate-800">{region.name}</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <div className="flex items-center space-x-2 text-slate-600">
                    <Users size={16} />
                    <span className="text-sm font-medium">Headcount</span>
                </div>
                <span className={`font-bold ${region.headcountMean > 20 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {region.headcountMean}%
                </span>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <div className="flex items-center space-x-2 text-slate-600">
                    <Activity size={16} />
                    <span className="text-sm font-medium">Intensity</span>
                </div>
                <span className="font-bold text-slate-800">{region.intensityMean}%</span>
              </div>
              
               <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-slate-600">
                    <span className="text-xs font-bold bg-slate-200 px-1.5 py-0.5 rounded text-slate-500">MPI</span>
                    <span className="text-sm font-medium">Score</span>
                </div>
                <span className="font-bold text-slate-800">{region.mpiMean}</span>
              </div>
            </div>

            <div className="mt-6 bg-slate-50 p-3 rounded-lg flex items-start space-x-2">
                <Info size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-slate-600 leading-relaxed">
                    {region.interpretation}
                </p>
            </div>
          </div>
          <div className={`h-1.5 w-full ${
              region.headcountMean > 30 ? 'bg-rose-500' : 
              region.headcountMean > 10 ? 'bg-amber-400' : 'bg-emerald-400'
          }`}></div>
        </div>
      ))}
    </div>
  );
};