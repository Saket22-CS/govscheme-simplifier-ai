import React from 'react';
import ReactMarkdown from 'react-markdown';
import { CheckCircle, AlertTriangle, Copy, Printer, FileText, User, IndianRupee, MapPin, ClipboardList } from 'lucide-react';

interface ResponseCardProps {
  content: string;
}

export const ResponseCard: React.FC<ResponseCardProps> = ({ content }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-none shadow-none overflow-hidden print:border-0">
      
      {/* Official Status Header */}
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-govGreen text-white text-[10px] font-bold px-2 py-0.5 rounded-none uppercase">
            <CheckCircle className="h-3 w-3" /> AI Generated Content
          </div>
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Scheme Assessment Summary</h2>
        </div>
        <div className="flex items-center gap-4 no-print">
          <button onClick={handleCopy} className="text-slate-500 hover:text-govBlue dark:hover:text-blue-400 flex items-center gap-1.5 text-[11px] font-bold uppercase transition-colors">
            <Copy className="h-4 w-4" /> Copy
          </button>
          <button onClick={handlePrint} className="text-slate-500 hover:text-govBlue dark:hover:text-blue-400 flex items-center gap-1.5 text-[11px] font-bold uppercase transition-colors">
            <Printer className="h-4 w-4" /> Print
          </button>
        </div>
      </div>

      {/* Accuracy Badge */}
      <div className="px-6 py-2 bg-blue-50 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-900/30 flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-govBlue" />
        <span className="text-[10px] font-bold text-govBlue dark:text-blue-400 uppercase tracking-wider">✔ AI Generated | Refer Official Portal for Final Verification</span>
      </div>

      {/* Main Document Body */}
      <div className="p-6 md:p-10 lg:p-12">
        <div className="prose prose-slate dark:prose-invert max-w-none 
          prose-headings:text-slate-900 dark:prose-headings:text-white
          prose-p:text-slate-700 dark:prose-p:text-slate-300
          prose-p:text-base prose-p:leading-relaxed
          prose-li:text-slate-700 dark:prose-li:text-slate-300
        ">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => (
                <div className="mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <h1 className="text-2xl font-black uppercase tracking-tight text-govBlue dark:text-blue-500 m-0" {...props} />
                </div>
              ),
              h2: ({node, ...props}) => {
                const text = String(props.children).toLowerCase();
                let icon = <FileText className="w-4 h-4 text-govBlue dark:text-blue-400" />;
                if (text.includes('eligibility') || text.includes('who can apply')) icon = <User className="w-4 h-4 text-govBlue dark:text-blue-400" />;
                if (text.includes('benefit')) icon = <IndianRupee className="w-4 h-4 text-govBlue dark:text-blue-400" />;
                if (text.includes('how to apply') || text.includes('process')) icon = <MapPin className="w-4 h-4 text-govBlue dark:text-blue-400" />;
                if (text.includes('document')) icon = <ClipboardList className="w-4 h-4 text-govBlue dark:text-blue-400" />;

                return (
                  <div className="mt-10 mb-4 first:mt-0">
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                      {icon}
                      <h2 className="text-base font-bold uppercase tracking-wider m-0 text-slate-800 dark:text-slate-200" {...props} />
                    </div>
                  </div>
                );
              },
              ul: ({node, ...props}) => <ul className="list-none space-y-3 my-6 p-0" {...props} />,
              li: ({node, ...props}) => (
                <li className="flex gap-3 items-start p-3 bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                  <span className="text-govBlue dark:text-blue-400 font-bold">•</span>
                  <span className="flex-1 text-[15px] leading-snug" {...props} />
                </li>
              ),
              strong: ({node, ...props}) => <span className="font-bold text-slate-900 dark:text-white" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Official Warning Section */}
      <div className="bg-orange-50 dark:bg-orange-900/5 px-8 py-6 border-t border-slate-200 dark:border-slate-800 flex items-start gap-4">
        <AlertTriangle className="h-6 w-6 text-govSaffron flex-shrink-0" />
        <div className="text-[12px] leading-relaxed text-slate-600 dark:text-slate-400">
          <p className="font-bold text-slate-900 dark:text-slate-200 uppercase tracking-widest mb-1">Mandatory Disclaimer</p>
          <p>
            The details provided above are an automated summary of government policies. Scheme guidelines are subject to change. Citizens are advised to verify eligibility and application steps on the official government website (<strong>india.gov.in</strong> or department portals) before submitting any documents.
          </p>
        </div>
      </div>
    </div>
  );
};