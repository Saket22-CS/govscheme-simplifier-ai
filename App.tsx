import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Sparkles, MessageSquare, Sun, Moon, Search, Globe2, ChevronDown } from 'lucide-react';
import { Button } from './components/Button';
import { ResponseCard } from './components/ResponseCard';
import { fetchSchemeDetails } from './services/geminiService';
import { SuggestionChip, Language } from './types';

// Categories for Quick Actions
const CATEGORIES: SuggestionChip[] = [
  { label: "Farmer", icon: "🚜", query: "I am a farmer looking for government schemes for crop loss and loans." },
  { label: "Student", icon: "🎓", query: "I am a student from a low-income family looking for scholarships." },
  { label: "Women", icon: "👩", query: "Government schemes for women entrepreneurs and self-help groups." },
  { label: "Business", icon: "💼", query: "Small business loans and MSME schemes." },
  { label: "Senior", icon: "👴", query: "Pension and healthcare schemes for senior citizens." },
];

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState<Language>('English');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  
  const resultRef = useRef<HTMLDivElement>(null);

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const data = await fetchSchemeDetails(query, language);
      setResponse(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to result when it appears
  useEffect(() => {
    if (response && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [response]);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans flex flex-col
      ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}
      bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed
    `}>
      
      {/* Navigation / Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md border-b transition-colors duration-300
        dark:bg-slate-950/80 dark:border-slate-800 bg-white/80 border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 text-white p-2 rounded-lg shadow-lg shadow-orange-500/20">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                GovScheme Simplifier <span className="text-orange-600 dark:text-orange-500">AI</span> 🇮🇳
              </h1>
            </div>
          </div>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-8">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Government Schemes <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
              Simplified for You
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Understand eligibility, benefits, and application processes in simple language. 
            No confusing legal terms—just clear answers.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 p-6 md:p-8 relative overflow-hidden">
          {/* Top Decorator */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-500 opacity-80"></div>

          {/* Controls: Language & Categories */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            
            {/* Language Selector */}
            <div className="relative group">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 cursor-pointer hover:border-teal-500 transition-all">
                <Globe2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Language:</span>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="bg-transparent border-none text-sm font-bold text-teal-700 dark:text-teal-400 focus:ring-0 cursor-pointer pr-8"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Hinglish">Hinglish</option>
                </select>
              </div>
            </div>

            {/* Quick Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto md:pb-0 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setQuery(cat.query)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-slate-600 dark:text-slate-300 hover:text-orange-700 dark:hover:text-orange-400 rounded-lg text-sm transition-all border border-transparent hover:border-orange-200 dark:hover:border-orange-800 whitespace-nowrap"
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Area */}
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your situation... 
e.g. 'I am a farmer from UP looking for a loan' or 'Scholarship for SC students'"
              className="w-full p-4 text-lg bg-slate-50 dark:bg-slate-950/50 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 dark:focus:border-teal-400 min-h-[160px] resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all"
              disabled={isLoading}
            />
            <div className="absolute bottom-4 right-4 text-xs text-slate-400">
              AI-Powered Assistant
            </div>
          </div>

          {/* Action Area */}
          <div className="mt-6 flex items-center justify-end">
             <Button 
                onClick={handleSearch} 
                isLoading={isLoading} 
                disabled={!query.trim()}
                className="w-full md:w-auto text-lg px-8"
              >
                {!isLoading && <Sparkles className="w-5 h-5 mr-2" />}
                {isLoading ? 'Analyzing...' : 'Find Schemes'}
              </Button>
          </div>
        </div>

        {/* Loading State Skeleton */}
        {isLoading && (
          <div className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-8 animate-pulse text-center space-y-4">
             <div className="mx-auto w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 text-teal-600 dark:text-teal-400 animate-bounce" />
             </div>
             <div>
               <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Finding the best schemes for you...</h3>
               <p className="text-slate-500 dark:text-slate-400 text-sm">Reviewing eligibility criteria and benefits</p>
             </div>
             <div className="max-w-sm mx-auto space-y-2 mt-4">
               <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mx-auto"></div>
               <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mx-auto"></div>
             </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Area */}
        <div ref={resultRef}>
           {response && <ResponseCard content={response} />}
        </div>

        {/* Value Proposition Micro-Section (Only shown when no results) */}
        {!response && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[
              { title: "Simple Language", desc: "No complex legal jargon.", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" },
              { title: "For Everyone", desc: "Farmers, Students, Women.", color: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300" },
              { title: "Instant Answers", desc: "Powered by advanced AI.", color: "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300" }
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all ${item.color}`}>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-sm opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 bg-white dark:bg-slate-950 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-2">
            GovScheme Simplifier AI
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-lg mx-auto leading-relaxed">
            This tool uses Artificial Intelligence to simplify public information. 
            It is not affiliated with the Government of India. 
            Always verify details on official portals like <a href="https://www.myscheme.gov.in" target="_blank" rel="noreferrer" className="underline hover:text-teal-500">myscheme.gov.in</a>.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="h-1 w-8 bg-orange-500 rounded-full"></div>
            <div className="h-1 w-8 bg-white border border-slate-200 rounded-full"></div>
            <div className="h-1 w-8 bg-green-600 rounded-full"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;