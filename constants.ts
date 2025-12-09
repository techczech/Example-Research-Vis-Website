import { RegionStats, CountryStat } from './types';

export const REGIONAL_DATA: RegionStats[] = [
  {
    name: "Sub-Saharan Africa",
    mpiMean: 0.23,
    mpiMedian: 0.23,
    headcountMean: 45.2,
    headcountMedian: 47.9,
    intensityMean: 49.2,
    intensityMedian: 49.2,
    interpretation: "The epicenter of global multidimensional poverty. High prevalence and intensity indicate entrenched structural challenges."
  },
  {
    name: "South Asia",
    mpiMean: 0.10,
    mpiMedian: 0.07,
    headcountMean: 21.0,
    headcountMedian: 15.7,
    intensityMean: 43.5,
    intensityMedian: 42.2,
    interpretation: "Second highest region. Despite economic growth, high deprivation endures among marginalized populations."
  },
  {
    name: "Arab States",
    mpiMean: 0.06,
    headcountMean: 11.6,
    intensityMean: 40.3,
    interpretation: "Conflict and instability may explain why rates remain higher than expected for wealthier states."
  },
  {
    name: "East Asia & Pacific",
    mpiMean: 0.06,
    headcountMean: 14.7,
    intensityMean: 41.1,
    interpretation: "Moderate poverty. Huge reductions in the last 20 years, but work remains to reach <5% poverty."
  },
  {
    name: "Latin America & Caribbean",
    mpiMean: 0.03,
    headcountMean: 6.9,
    intensityMean: 40.1,
    interpretation: "Slightly lower poverty reflecting targeted social programs, but inequality persists."
  },
  {
    name: "Europe & Central Asia",
    mpiMean: 0.004,
    mpiMedian: 0.0015,
    headcountMean: 1.2,
    headcountMedian: 0.41,
    intensityMean: 37.0,
    intensityMedian: 36.9,
    interpretation: "Multidimensional poverty is virtually eliminated due to robust social safety nets."
  }
];

export const TOP_PERFORMERS: CountryStat[] = [
  { rank: 1, name: "Serbia", mpi: 0.00043, headcount: 0.11, intensity: 36.5, region: "Europe & Central Asia" },
  { rank: 2, name: "Azerbaijan", mpi: 0.001, headcount: 0.3, intensity: 35.8, region: "Europe & Central Asia" },
  { rank: 3, name: "Armenia", mpi: 0.001, headcount: 0.2, intensity: 36.2, region: "Europe & Central Asia" },
  { rank: 4, name: "Turkmenistan", mpi: 0.002, headcount: 0.4, intensity: 37.1, region: "Europe & Central Asia" },
  { rank: 5, name: "Georgia", mpi: 0.002, headcount: 0.5, intensity: 37.5, region: "Europe & Central Asia" }
];

export const ANALYSIS_SECTIONS = [
  {
    title: "Key Trends 2014-2023",
    content: "The global MPI landscape remains starkly unequal. Sub-Saharan Africa leads in poverty incidence and intensity, with nearly one in two persons multidimensionally poor. Asia’s performance is mixed, with South Asia retaining much higher poverty than East Asia. Europe & Central Asia demonstrates the potential for rapid poverty elimination."
  },
  {
    title: "Data Gaps & Anomalies",
    content: "About 7% of the dataset has missing values. Notably, the bottom 5 highest-poverty country slots are empty in the source data, likely excluding extreme cases like Niger or Chad. Some headcount values were anomalous, suggesting percentage coding differences."
  },
  {
    title: "Conclusion",
    content: "While there has been remarkable progress in some regions, multidimensional poverty is still highly concentrated geographically. Sub-Saharan Africa and South Asia drive global rates. Europe & Central Asia illustrates what is possible with comprehensive policies."
  }
];

// Helper to generate mock data based on regional stats to simulate the full dataset
const generateMockCountries = (): CountryStat[] => {
  const data: CountryStat[] = [...TOP_PERFORMERS];
  
  const regions = [
    { name: "Sub-Saharan Africa", count: 15, mpiBase: 0.23, hcBase: 45.2, intBase: 49.2 },
    { name: "South Asia", count: 8, mpiBase: 0.10, hcBase: 21.0, intBase: 43.5 },
    { name: "East Asia & Pacific", count: 8, mpiBase: 0.06, hcBase: 14.7, intBase: 41.1 },
    { name: "Latin America & Caribbean", count: 8, mpiBase: 0.03, hcBase: 6.9, intBase: 40.1 },
    { name: "Arab States", count: 6, mpiBase: 0.06, hcBase: 11.6, intBase: 40.3 },
    { name: "Europe & Central Asia", count: 5, mpiBase: 0.004, hcBase: 1.2, intBase: 37.0 }
  ];

  let idCounter = 6;

  regions.forEach(reg => {
    for (let i = 0; i < reg.count; i++) {
      // Add some random variance
      const variance = (Math.random() - 0.5) * 0.4; // +/- 20%
      const hc = Math.max(0, Math.min(100, reg.hcBase * (1 + variance)));
      const int = Math.max(33, Math.min(100, reg.intBase * (1 + (variance * 0.5))));
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
