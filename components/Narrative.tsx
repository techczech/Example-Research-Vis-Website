import React from 'react';
import narrative from '../data/narrative';
import { FileText, AlertOctagon } from 'lucide-react';

export const Narrative: React.FC = () => {
  const { analysis } = narrative;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
        <div className="flex items-center space-x-3 mb-4">
            <FileText className="text-indigo-600" size={24} />
            <h2 className="text-2xl font-bold text-slate-800">{analysis.title}</h2>
        </div>
        <p className="text-slate-600 leading-relaxed mb-6">
            {analysis.intro}
        </p>
        
        <div className="grid gap-6">
            {analysis.sections.map((section) => (
                <div key={section.title} className="bg-slate-50 rounded-lg p-5">
                    <h3 className="font-bold text-lg text-slate-800 mb-2">{section.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{section.content}</p>
                </div>
            ))}
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl shadow-sm p-6 border border-amber-100">
        <div className="flex items-start space-x-3">
            <AlertOctagon className="text-amber-500 flex-shrink-0 mt-1" size={20} />
            <div>
                <h4 className="font-bold text-amber-800 mb-1">{analysis.caveat.title}</h4>
                <p className="text-sm text-amber-700">
                    {analysis.caveat.content}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};