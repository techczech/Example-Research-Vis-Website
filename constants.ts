import { RegionStats, CountryStat } from './types';
import statistics from './data/statistics';
import narrative from './data/narrative';

// Export static data from imported modules
export const REGIONAL_DATA: RegionStats[] = statistics.regional;
export const TOP_PERFORMERS: CountryStat[] = statistics.topPerformers;
export const ANALYSIS_CONTENT = narrative.analysis;

// Helper to generate mock data based on regional stats
const generateMockCountries = (): CountryStat[] => {
  const data: CountryStat[] = [...TOP_PERFORMERS];
  
  // Use distribution parameters from imported data
  const regions = statistics.distributionParams;

  let idCounter = 6;

  regions.forEach(reg => {
    for (let i = 0; i < reg.count; i++) {
      // Add some random variance
      const variance = (Math.random() - 0.5) * 0.4; // +/- 20%
      // Access properties safely
      const hcBase = (reg as any).hcBase || 0;
      const intBase = (reg as any).intBase || 0;
      
      const hc = Math.max(0, Math.min(100, hcBase * (1 + variance)));
      const int = Math.max(33, Math.min(100, intBase * (1 + (variance * 0.5))));
      const mpi = (hc / 100) * (int / 100);

      data.push({
        rank: idCounter++,
        name: `${reg.name} - Sample ${i + 1}`,
        region: reg.name,
        headcount: parseFloat(hc.toFixed(1)),
        intensity: parseFloat(int.toFixed(1)),
        mpi: parseFloat(mpi.toFixed(3))
      });
    }
  });

  return data.sort((a, b) => b.mpi - a.mpi); // Sort by MPI descending (Poverty High to Low)
};

export const FULL_DATASET: CountryStat[] = generateMockCountries();