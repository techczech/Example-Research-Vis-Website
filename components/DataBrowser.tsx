import React, { useState, useMemo } from 'react';
import { FULL_DATASET } from '../constants';
import { Search, Download, ArrowUpDown, Filter, ChevronDown } from 'lucide-react';

export const DataBrowser: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>({ key: 'mpi', direction: 'desc' });
  const [selectedRegion, setSelectedRegion] = useState('All');

  const regions = useMemo(() => ['All', ...Array.from(new Set(FULL_DATASET.map(d => d.region)))], []);

  const sortedData = useMemo(() => {
    let sortableItems = [...FULL_DATASET];
    
    // Filter
    if (selectedRegion !== 'All') {
      sortableItems = sortableItems.filter(item => item.region === selectedRegion);
    }
    
    if (searchTerm) {
      sortableItems = sortableItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortConfig !== null) {
      sortableItems.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [searchTerm, sortConfig, selectedRegion]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const downloadCSV = () => {
    const headers = ['Name', 'Region', 'MPI', 'Headcount (%)', 'Intensity (%)'];
    const csvContent = [
      headers.join(','),
      ...sortedData.map(row => 
        `"${row.name}","${row.region}",${row.mpi},${row.headcount},${row.intensity}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'mpi_data_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-800">Raw Data Browser</h2>
          <button 
            onClick={downloadCSV}
            className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Download size={16} />
            <span>Download CSV</span>
          </button>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-slate-400" />
            </div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-slate-300 rounded-lg leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none cursor-pointer"
            >
              {regions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown size={16} className="text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {[
                { label: 'Country', key: 'name' },
                { label: 'Region', key: 'region' },
                { label: 'MPI Score', key: 'mpi' },
                { label: 'Headcount (%)', key: 'headcount' },
                { label: 'Intensity (%)', key: 'intensity' }
              ].map((header) => (
                <th
                  key={header.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => requestSort(header.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{header.label}</span>
                    <ArrowUpDown size={12} className="text-slate-400" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {sortedData.length > 0 ? (
              sortedData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{row.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{row.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-mono">{row.mpi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{row.headcount}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{row.intensity}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
        <p className="text-xs text-slate-500">
          Showing {sortedData.length} entries. Data simulated based on regional statistical averages for demonstration.
        </p>
      </div>
    </div>
  );
};