import React, { useState } from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell
} from 'recharts';
import { FULL_DATASET, REGIONAL_DATA } from '../constants';
import { SlidersHorizontal, BarChart2, ScatterChart as ScatterIcon } from 'lucide-react';

export const Visualizer: React.FC = () => {
  const [chartType, setChartType] = useState<'scatter' | 'bar'>('scatter');
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-slate-200 shadow-lg rounded-lg">
          <p className="font-bold text-slate-800">{data.name}</p>
          <p className="text-sm text-slate-500 mb-2">{data.region}</p>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Headcount:</span> {data.headcount}%</p>
            <p><span className="font-medium">Intensity:</span> {data.intensity}%</p>
            <p><span className="font-medium">MPI:</span> {data.mpi}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <SlidersHorizontal className="text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-800">Data Visualizer</h2>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setChartType('scatter')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                chartType === 'scatter' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <ScatterIcon size={16} />
              <span>Incidence vs. Intensity</span>
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                chartType === 'bar' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <BarChart2 size={16} />
              <span>Regional Distribution</span>
            </button>
          </div>
        </div>

        <div className="h-[500px] w-full bg-slate-50 rounded-lg border border-slate-100 p-4">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'scatter' ? (
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  type="number" 
                  dataKey="headcount" 
                  name="Headcount Ratio" 
                  unit="%" 
                  label={{ value: 'Headcount Ratio (% of population)', position: 'bottom', offset: 0, fill: '#64748b' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="intensity" 
                  name="Intensity" 
                  unit="%" 
                  domain={[30, 60]}
                  label={{ value: 'Intensity of Deprivation (%)', angle: -90, position: 'insideLeft', fill: '#64748b' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                <Legend verticalAlign="top" height={36}/>
                {REGIONAL_DATA.map((region, index) => {
                   const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
                   return (
                     <Scatter 
                        key={region.name}
                        name={region.name} 
                        data={FULL_DATASET.filter(d => d.region === region.name)} 
                        fill={colors[index % colors.length]} 
                        shape="circle"
                     />
                   )
                })}
              </ScatterChart>
            ) : (
               <BarChart
                data={REGIONAL_DATA}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 12}} interval={0} angle={-15} textAnchor="end" height={60} />
                <YAxis yAxisId="left" orientation="left" stroke="#6366f1" label={{ value: 'Headcount (%)', angle: -90, position: 'insideLeft' }}/>
                <YAxis yAxisId="right" orientation="right" stroke="#ec4899" label={{ value: 'Intensity (%)', angle: 90, position: 'insideRight' }}/>
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="headcountMean" name="Avg Headcount" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="intensityMean" name="Avg Intensity" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <h4 className="font-bold text-indigo-900 mb-2">Analysis</h4>
          <p className="text-sm text-indigo-800">
            {chartType === 'scatter' 
              ? "The scatter plot reveals a strong positive correlation between the incidence of poverty (Headcount) and its severity (Intensity). Countries in Sub-Saharan Africa (top right) tend to have both higher prevalence and deeper deprivation compared to countries in Europe & Central Asia (bottom left)."
              : "The bar chart contrasts the average poverty rate against intensity across regions. Note how Intensity (pink) remains relatively high (>35%) even in regions with lower Headcount ratios, suggesting that the 'poorest of the poor' face significant deprivation everywhere."}
          </p>
        </div>
      </div>
    </div>
  );
};