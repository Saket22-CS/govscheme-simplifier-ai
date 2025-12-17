import React from 'react';
import ReactMarkdown from 'react-markdown';
import { CheckCircle2, AlertCircle, Share2, Copy } from 'lucide-react';

interface ResponseCardProps {
  content: string;
}

export const ResponseCard: React.FC<ResponseCardProps> = ({ content }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-100 dark:border-slate-700 overflow-hidden animate-fade-in-up transition-colors duration-300">
      
      {/* Card Header */}
      <div className="bg-teal-600 dark:bg-teal-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="text-white h-6 w-6" />
          <h2 className="text-lg font-bold text-white tracking-wide">GovScheme Results</h2>
        </div>
        <button onClick={handleCopy} className="text-teal-100 hover:text-white transition-colors" title="Copy Result">
          <Copy className="h-5 w-5" />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8">
        <div className="prose prose-lg max-w-none 
          prose-headings:font-bold prose-headings:text-teal-800 dark:prose-headings:text-teal-400
          prose-p:text-slate-700 dark:prose-p:text-slate-300
          prose-li:text-slate-700 dark:prose-li:text-slate-300
          prose-strong:text-slate-900 dark:prose-strong:text-white
          prose-ul:marker:text-orange-500
        ">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h3 className="text-2xl font-extrabold mb-6 pb-2 border-b-2 border-slate-100 dark:border-slate-700 text-slate-800 dark:text-white" {...props} />,
              h2: ({node, ...props}) => (
                <div className="flex items-center gap-2 mt-8 mb-4">
                   <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-1 rounded">📌</span>
                   <h4 className="text-xl font-bold m-0 text-teal-800 dark:text-teal-400" {...props} />
                </div>
              ),
              ul: ({node, ...props}) => <ul className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 pl-8 space-y-2 my-4 border border-slate-100 dark:border-slate-700" {...props} />,
              li: ({node, ...props}) => <li className="pl-1" {...props} />,
              strong: ({node, ...props}) => <span className="font-bold text-slate-900 dark:text-slate-100" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="bg-orange-50 dark:bg-slate-900/50 px-6 py-4 border-t border-orange-100 dark:border-slate-700 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-orange-600 dark:text-orange-500" />
        <div>
          <p className="text-sm font-medium text-orange-800 dark:text-orange-400">Important Disclaimer</p>
          <p className="text-xs text-orange-700/80 dark:text-orange-400/70 mt-1">
            This is an AI-generated summary. Scheme details (eligibility, benefits) can change. 
            Always verify with the official <a href="#" className="underline decoration-orange-400">government website</a> or your local office.
          </p>
        </div>
      </div>
    </div>
  );
};