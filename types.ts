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

// Content Types
export interface Link {
  text: string;
  url: string;
}

export interface HeroContent {
  title: string;
  description: string;
  links: Link[];
  disclaimer: {
    buttonText: string;
    content: string;
  };
  highlights: {
    label: string;
    value: string;
    type: string;
  }[];
}

export interface AnalysisSection {
  title: string;
  content: string;
}

export interface AnalysisContent {
  title: string;
  intro: string;
  sections: AnalysisSection[];
  caveat: {
    title: string;
    content: string;
  };
}