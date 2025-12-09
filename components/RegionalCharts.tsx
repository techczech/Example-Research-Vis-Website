import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { REGIONAL_DATA } from '../constants';

export const RegionalCharts: React.FC = () => {
  const [metric, setMetric] = useState<'mpi' | 'headcount' | 'intensity'>('headcount');

  const getMetricLabel = (m: string) => {
    switch (m) {
      case 'mpi': return 'MPI (Mean)';
      case 'headcount': return 'Headcount Ratio (%)';
      case 'intensity': return 'Intensity of Deprivation (%)';
      default: return '';
    }
  };

  const getDataKey = (m: string) => {
    switch (m) {
      case 'mpi': return 'mpiMean';
      case 'headcount': return 'headcountMean';
      case 'intensity': return 'intensityMean';
      default: return 'headcountMean';
    }
  };

  const getColor = (value: number, type: string) => {
    if (type === 'mpi') {
       return value > 0.1 ? '#f43f5e' : value > 0.05 ? '#fbbf24' : '#10b981';
    }
    // Headcount
    if (type === 'headcount') {
        return value > 20 ? '#f43f5e' : value > 10 ? '#fbbf24' : '#10b981';
    }
    // Intensity
    return value > 45 ? '#f43f5e' : value > 40 ? '#fbbf24' : '#10b981';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 sm:mb-0">Regional Comparison</h3>
        <div className="flex bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setMetric('headcount')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              metric === 'headcount' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Headcount (%)
          </button>
          <button
            onClick={() => setMetric('intensity')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              metric === 'intensity' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Intensity (%)
          </button>
          <button
            onClick={() => setMetric('mpi')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              metric === 'mpi' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            MPI Score
          </button>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={REGIONAL_DATA}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={150} 
              tick={{fill: '#475569', fontSize: 12}}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              cursor={{fill: '#f1f5f9'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Bar 
              dataKey={getDataKey(metric)} 
              name={getMetricLabel(metric)} 
              radius={[0, 4, 4, 0]}
              barSize={30}
              animationDuration={1500}
            >
                {REGIONAL_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry[getDataKey(metric)] as number, metric)} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-slate-500 text-center italic">
        * Higher values indicate higher poverty levels. Colors indicate severity (Red: High, Yellow: Med, Green: Low).
      </div>
    </div>
  );
};