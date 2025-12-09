import React, { useState } from 'react';
import { Globe, TrendingDown, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import narrative from '../data/narrative';

export const Hero: React.FC = () => {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const { hero } = narrative;

  const renderHighlightIcon = (type: string) => {
    switch(type) {
      case 'high': return <div className="bg-rose-500 rounded-full p-2"><AlertTriangle size={20} className="text-white" /></div>;
      case 'low': return <div className="bg-emerald-500 rounded-full p-2"><TrendingDown size={20} className="text-white" /></div>;
      default: return <div className="bg-blue-500 rounded-full p-2"><Globe size={20} className="text-white" /></div>;
    }
  };

  return (
    <div className="bg-indigo-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
         <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
         </svg>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
            {hero.title}
          </h1>
          
          <div className="max-w-4xl mx-auto text-lg text-indigo-200 mb-8 space-y-4">
             <p className="leading-relaxed">
              {/* Parse text to inject links - simplified for this implementation by hardcoding structure based on JSON data presence */}
              This is an example of data sharing based on the MPI index. Full code is available on <a href={hero.links[0].url} target="_blank" rel="noopener noreferrer" className="underline hover:text-white text-indigo-300 transition-colors font-semibold">{hero.links[0].text}</a>. The data is sourced from <a href={hero.links[1].url} target="_blank" rel="noopener noreferrer" className="underline hover:text-white text-indigo-300 transition-colors font-semibold">{hero.links[1].text}</a> and the analysis was performed by <a href={hero.links[2].url} target="_blank" rel="noopener noreferrer" className="underline hover:text-white text-indigo-300 transition-colors font-semibold">{hero.links[2].text}</a>.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-10 text-left backdrop-blur-md shadow-lg rounded-xl overflow-hidden border-2 border-rose-500 bg-rose-900/60 transition-all duration-300">
             <button 
                onClick={() => setIsDisclaimerOpen(!isDisclaimerOpen)}
                className="w-full px-6 py-4 flex items-center justify-between text-white font-bold text-xl tracking-wide focus:outline-none hover:bg-rose-800/50 transition-colors"
             >
                <div className="flex items-center">
                   <AlertTriangle className="mr-3 h-6 w-6 text-rose-400" /> 
                   {hero.disclaimer.buttonText}
                </div>
                {isDisclaimerOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
             </button>
             
             {isDisclaimerOpen && (
               <div className="px-6 pb-6 pt-2 text-white text-base leading-relaxed font-medium border-t border-rose-500/30 animate-fadeIn">
                 {hero.disclaimer.content}
               </div>
             )}
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {hero.highlights.map((item, idx) => (
              <div key={idx} className="bg-indigo-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3 border border-indigo-700">
                {renderHighlightIcon(item.type)}
                <div className="text-left">
                  <p className="text-xs text-indigo-300 uppercase font-semibold">{item.label}</p>
                  <p className="text-lg font-bold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};