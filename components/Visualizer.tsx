import React, { useState, useMemo } from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis,
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  ReferenceLine
} from 'recharts';
import { FULL_DATASET, REGIONAL_DATA } from '../constants';
import { SlidersHorizontal, BarChart2, ScatterChart as ScatterIcon, Filter, Check } from 'lucide-react';

export const Visualizer: React.FC = () => {
  const [chartType, setChartType] = useState<'scatter' | 'bar'>('scatter');
  const [xAxisMetric, setXAxisMetric] = useState<string>('headcount');
  const [yAxisMetric, setYAxisMetric] = useState<string>('intensity');
  
  // Initialize with all regions active
  const [activeRegions, setActiveRegions] = useState<string[]>(REGIONAL_DATA.map(r => r.name));

  const allRegions = useMemo(() => REGIONAL_DATA.map(r => r.name), []);
  const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

  const handleRegionToggle = (regionName: string) => {
    if (activeRegions.includes(regionName)) {
      setActiveRegions(prev => prev.filter(r => r !== regionName));
    } else {
      setActiveRegions(prev => [...prev, regionName]);
    }
  };

  const toggleAllRegions = () => {
    if (activeRegions.length === allRegions.length) {
      setActiveRegions([]);
    } else {
      setActiveRegions(allRegions);
    }
  };

  const getMetricLabel = (key: string) => {
    switch (key) {
      case 'headcount': return 'Headcount Ratio (%)';
      case 'intensity': return 'Intensity (%)';
      case 'mpi': return 'MPI Score';
      default: return key;
    }
  };

  // Filter Data
  const filteredData = useMemo(() => {
    return FULL_DATASET.filter(d => activeRegions.includes(d.region));
  }, [activeRegions]);

  const filteredRegionalData = useMemo(() => {
    return REGIONAL_DATA.filter(r => activeRegions.includes(r.name));
  }, [activeRegions]);

  // Calculate averages for reference lines
  const xAverage = useMemo(() => {
    if (filteredData.length === 0) return 0;
    const sum = filteredData.reduce((acc, curr) => acc + (curr as any)[xAxisMetric], 0);
    return sum / filteredData.length;
  }, [filteredData, xAxisMetric]);

  const yAverage = useMemo(() => {
    if (filteredData.length === 0) return 0;
    const sum = filteredData.reduce((acc, curr) => acc + (curr as any)[yAxisMetric], 0);
    return sum / filteredData.length;
  }, [filteredData, yAxisMetric]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-slate-200 shadow-xl rounded-lg z-50 min-w-[200px]">
          <p className="font-bold text-slate-800 text-lg">{data.name}</p>
          <p className="text-sm text-indigo-600 font-medium mb-3">{data.region}</p>
          <div className="space-y-1.5 text-sm border-t border-slate-100 pt-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Headcount:</span>
              <span className="font-mono font-medium">{data.headcount}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Intensity:</span>
              <span className="font-mono font-medium">{data.intensity}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">MPI:</span>
              <span className="font-mono font-bold text-slate-900">{data.mpi}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
        {/* Controls Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 border-b border-slate-100 pb-6 gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
               <SlidersHorizontal className="text-indigo-600" size={24} />
            </div>
            <div>
               <h2 className="text-xl font-bold text-slate-800">Visualizer Controls</h2>
               <p className="text-xs text-slate-500">Customize metrics and filters</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
             <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setChartType('scatter')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    chartType === 'scatter' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <ScatterIcon size={16} />
                  <span>Distribution</span>
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    chartType === 'bar' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <BarChart2 size={16} />
                  <span>Comparison</span>
                </button>
             </div>
          </div>
        </div>

        {/* Filters & Axis Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-4">
            {/* Region Filter */}
            <div className="lg:col-span-8 space-y-3">
               <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-700 flex items-center">
                    <Filter size={14} className="mr-2" /> Filter Regions
                  </h3>
                  <button onClick={toggleAllRegions} className="text-xs text-indigo-600 hover:text-indigo-800 underline">
                    {activeRegions.length === allRegions.length ? 'Clear All' : 'Select All'}
                  </button>
               </div>
               <div className="flex flex-wrap gap-2">
                  {allRegions.map((region, idx) => {
                     const isActive = activeRegions.includes(region);
                     return (
                        <button
                          key={region}
                          onClick={() => handleRegionToggle(region)}
                          className={`
                            px-3 py-1.5 rounded-full text-xs font-medium transition-all border flex items-center
                            ${isActive 
                               ? `bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm` 
                               : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                            }
                          `}
                        >
                          {isActive && <Check size={12} className="mr-1.5" />}
                          {region}
                        </button>
                     )
                  })}
               </div>
            </div>

            {/* Scatter Controls */}
            {chartType === 'scatter' && (
              <div className="lg:col-span-4 bg-slate-50 rounded-lg p-4 border border-slate-100 space-y-3">
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Axis Configuration</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-slate-500 mb-1">X Axis</label>
                        <select 
                          value={xAxisMetric}
                          onChange={(e) => setXAxisMetric(e.target.value)}
                          className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                           <option value="headcount">Headcount</option>
                           <option value="intensity">Intensity</option>
                           <option value="mpi">MPI Score</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-slate-500 mb-1">Y Axis</label>
                         <select 
                          value={yAxisMetric}
                          onChange={(e) => setYAxisMetric(e.target.value)}
                          className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                           <option value="headcount">Headcount</option>
                           <option value="intensity">Intensity</option>
                           <option value="mpi">MPI Score</option>
                        </select>
                    </div>
                 </div>
              </div>
            )}
        </div>

        {/* Chart Area */}
        <div className="h-[500px] w-full bg-slate-50 rounded-lg border border-slate-100 p-4 relative">
          {activeRegions.length === 0 && (
             <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
                <div className="text-center">
                   <Filter size={48} className="mx-auto text-slate-300 mb-2" />
                   <p className="text-slate-500 font-medium">Please select at least one region</p>
                </div>
             </div>
          )}
          
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'scatter' ? (
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  type="number" 
                  dataKey={xAxisMetric} 
                  name={getMetricLabel(xAxisMetric)} 
                  label={{ value: getMetricLabel(xAxisMetric), position: 'bottom', offset: 0, fill: '#64748b' }}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis 
                  type="number" 
                  dataKey={yAxisMetric} 
                  name={getMetricLabel(yAxisMetric)} 
                  label={{ value: getMetricLabel(yAxisMetric), angle: -90, position: 'insideLeft', fill: '#64748b' }}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <ZAxis type="number" dataKey="mpi" range={[60, 400]} name="MPI Score" />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                <Legend verticalAlign="top" height={36}/>
                
                {/* Reference Lines for Averages */}
                <ReferenceLine x={xAverage} stroke="#cbd5e1" strokeDasharray="3 3" label={{ value: 'Avg', position: 'insideTopRight', fill: '#94a3b8', fontSize: 10 }} />
                <ReferenceLine y={yAverage} stroke="#cbd5e1" strokeDasharray="3 3" label={{ value: 'Avg', position: 'insideTopRight', fill: '#94a3b8', fontSize: 10 }} />

                {allRegions.map((region, index) => {
                   // Only render if active
                   if (!activeRegions.includes(region)) return null;
                   
                   return (
                     <Scatter 
                        key={region}
                        name={region} 
                        data={filteredData.filter(d => d.region === region)} 
                        fill={colors[index % colors.length]} 
                        shape="circle"
                     />
                   )
                })}
              </ScatterChart>
            ) : (
               <BarChart
                data={filteredRegionalData}
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

        <div className="mt-6 bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-start gap-3">
          <div className="bg-white p-1.5 rounded-full shadow-sm mt-0.5">
             <SlidersHorizontal size={16} className="text-indigo-500" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Visual Analysis</h4>
            <p className="text-sm text-slate-600">
                {chartType === 'scatter' 
                ? "The bubble size represents the MPI score. Larger bubbles indicate higher multidimensional poverty. Notice how regions form clusters, indicating that poverty incidence and intensity are structurally linked within geographical areas."
                : "Comparing regional averages highlights structural disparities. Use the filter above to isolate specific regions for a direct comparison."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};