# Global MPI Explorer

A modern, interactive React application designed to visualize and explore the **Global Multidimensional Poverty Index (MPI)**. This dashboard highlights regional disparities, identifies top performers, and provides tools for deep-diving into poverty incidence (Headcount) versus intensity.

## 🚀 Features

*   **Executive Dashboard**: A high-level overview with hero metrics and key highlights.
*   **Regional Analysis**: Interactive charts comparing MPI, Headcount Ratio, and Intensity across six major global regions.
*   **Interactive Visualizer**: 
    *   **Scatter Plot**: Explore the correlation between poverty intensity and headcount.
    *   **Bar Comparison**: Direct regional comparisons.
    *   **Dynamic Filtering**: Toggle specific regions on/off to isolate data.
*   **Data Browser**: A searchable, sortable table view of the dataset with CSV export functionality.
*   **Narrative Integration**: dedicated sections for analyst interpretations, caveats, and methodology explanations.

## 🛠️ Tech Stack

*   **Frontend Framework**: React 19 (TypeScript)
*   **Styling**: Tailwind CSS (Utility-first CSS)
*   **Visualization**: Recharts (Composable chart library)
*   **Icons**: Lucide React
*   **Build Tooling**: ES Modules (Vite-compatible structure)

## 📂 Project Structure

```
├── components/          # UI Components
│   ├── DataBrowser.tsx  # Searchable data table with export
│   ├── Hero.tsx         # Landing section with disclaimer
│   ├── Narrative.tsx    # Text-heavy analysis report view
│   ├── RegionCards.tsx  # Card grid for regional summaries
│   ├── RegionalCharts.tsx # Recharts implementation for regions
│   ├── TopCountries.tsx # Table for top performing countries
│   └── Visualizer.tsx   # Complex scatter/bar chart interaction
├── data/                # Content & Data Layer
│   ├── narrative.ts     # All text content (titles, paragraphs, footer)
│   └── statistics.ts    # Statistical baselines & regional data
├── constants.ts         # Data generation logic & aggregators
├── types.ts             # TypeScript interfaces
├── App.tsx              # Main layout & Tab navigation
└── index.tsx            # Entry point
```

## 📊 Data Management

This application separates **Logic** (Components) from **Content** (Data).

### 1. Content (`data/narrative.ts`)
All text content—including the hero title, analyst reports, glossary definitions, and footer links—is stored here. You can update the text without touching React code.

### 2. Statistics (`data/statistics.ts`)
This file contains:
*   **Regional Averages**: Real aggregate data for regions (Sub-Saharan Africa, South Asia, etc.).
*   **Top Performers**: Hardcoded list of specific country statistics.
*   **Distribution Parameters**: Configuration used to generate the simulated dataset.

### 3. Data Generation (`constants.ts`)
To demonstrate the visualizer capabilities without loading a massive external CSV, the app generates a **simulated dataset** (`FULL_DATASET`) in `constants.ts`. 

It uses the `distributionParams` from `statistics.ts` to create mock country records that statistically align with the real regional averages, adding slight random variance to visualize clusters effectively in the scatter plot.

## 🎨 Customization

### Changing the Text
Modify `data/narrative.ts`. The UI automatically adapts to the new strings.

### Updating Data
1.  **To update Regional Averages**: Edit `regional` array in `data/statistics.ts`.
2.  **To tweak the Simulated Data**: Adjust `distributionParams` in `data/statistics.ts`.
    *   `count`: Number of mock countries to generate per region.
    *   `hcBase`: Base Headcount Ratio.
    *   `intBase`: Base Intensity.

## 📦 Setup & Running

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 📝 License

This project is an educational visualization example. Data source attribution: OPHI (MN-61).
