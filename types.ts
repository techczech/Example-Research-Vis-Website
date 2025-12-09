export interface RegionStats {
  name: string;
  mpiMean: number;
  mpiMedian?: number;
  headcountMean: number;
  headcountMedian?: number;
  intensityMean: number;
  intensityMedian?: number;
  interpretation: string;
}

export interface CountryStat {
  rank?: number;
  name: string;
  mpi: number;
  headcount: number;
  intensity: number;
  region: string;
}

export interface TabItem {
  id: string;
  label: string;
  icon: any;
}

export interface ChartConfig {
  type: 'bar' | 'scatter';
  xAxis: keyof CountryStat | 'region';
  yAxis: keyof CountryStat;
}