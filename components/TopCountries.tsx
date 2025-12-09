import React from 'react';
import { TOP_PERFORMERS } from '../constants';
import { Medal, CheckCircle2 } from 'lucide-react';

export const TopCountries: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-emerald-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-white">
            <Medal size={24} className="text-yellow-300" />
            <h3 className="font-bold text-xl">Top Performers</h3>
        </div>
        <span className="text-emerald-100 text-sm font-medium bg-emerald-700 px-3 py-1 rounded-full">
            Lowest Poverty Rates
        </span>
      </div>
      
      <div className="p-0">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rank</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Country</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Region</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Headcount (%)</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">MPI</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {TOP_PERFORMERS.map((country, idx) => (
              <tr key={country.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">#{country.rank}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <CheckCircle2 size={16} className="text-emerald-500 mr-2" />
                    <span className="text-sm font-medium text-slate-900">{country.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{country.region}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right font-bold">{country.headcount}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-right">{country.mpi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
        <p className="text-xs text-slate-500 text-center">
            Note: All top 5 performers are from Europe & Central Asia, demonstrating poverty is rare and shallow in this region.
        </p>
      </div>
    </div>
  );
};