import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe2, ShieldCheck, ArrowRight, UserCheck, GraduationCap, Briefcase, HeartPulse, AlertTriangle, Landmark, ExternalLink, Menu, X, Sun, Moon, Info, HelpCircle } from 'lucide-react';
import { Button } from './components/Button';
import { ResponseCard } from './components/ResponseCard';
import { fetchSchemeDetails } from './services/geminiService';
import { SuggestionChip, Language } from './types';

const CATEGORIES: SuggestionChip[] = [
  { label: "Farmer", icon: "🌾", query: "Search for government schemes for farmers including crop insurance, loans, and subsidies." },
  { label: "Student", icon: "🎓", query: "What are the scholarship and educational support schemes available for students in India?" },
  { label: "Women", icon: "👩", query: "Tell me about government welfare schemes and self-employment support for women." },
  { label: "Business", icon: "🏢", query: "Details on MSME loans, startup india, and business subsidies for small scale industries." },
  { label: "Senior Citizen", icon: "👴", query: "Pension schemes, healthcare benefits, and saving schemes for senior citizens." },
];

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState<Language>('English');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true); // Default to Dark
  const [menuOpen, setMenuOpen] = useState(false);
  
  const resultRef = useRef<HTMLDivElement>(null);

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
      setError(err.message || "Request could not be processed. Please check your network.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (response && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [response]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 font-sans ${darkMode ? 'bg-govDarkBg text-govTextLight' : 'bg-govLightBg text-govTextDark'}`}>
      
      {/* 1️⃣ OFFICIAL GOVERNMENT HEADER */}
      <header className="bg-govBlue text-white shadow-none border-b border-blue-800 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
               <div className="p-1.5 bg-white rounded-none">
                <Landmark className="h-8 w-8 text-govBlue" />
               </div>
            </div>
            <div className="h-10 w-[1px] bg-white/20 hidden sm:block"></div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-black uppercase tracking-tighter">GovScheme Simplifier AI</h1>
                <span className="text-[10px] bg-govSaffron text-white font-black px-1.5 py-0.5 rounded-none uppercase">BETA</span>
              </div>
              <p className="text-[10px] sm:text-xs opacity-90 font-medium tracking-wide uppercase">Government Scheme Information Assistant | National Literacy Portal</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-3">
              <Globe2 className="w-4 h-4 text-white/70" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Language:</span>
              <div className="flex gap-2">
                {(['English', 'Hindi', 'Hinglish'] as Language[]).map(lang => (
                  <button 
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`text-[11px] font-bold uppercase px-2 py-1 border border-white/20 hover:bg-white/10 transition-colors ${language === lang ? 'bg-white text-govBlue' : 'text-white'}`}
                  >
                    {lang === 'Hindi' ? 'हिंदी' : lang}
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-white/10 transition-colors rounded-none border border-white/20"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-blue-800 p-6 border-t border-blue-700 animate-fade-in">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-black uppercase text-white/60 tracking-widest">Preferred Language</span>
                <div className="flex flex-wrap gap-2">
                  {(['English', 'Hindi', 'Hinglish'] as Language[]).map(lang => (
                    <button 
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`flex-1 text-[11px] font-bold uppercase py-2 border border-white/20 ${language === lang ? 'bg-white text-govBlue' : 'text-white'}`}
                    >
                      {lang === 'Hindi' ? 'हिंदी' : lang}
                    </button>
                  ))}
                </div>
              </div>
              <Button variant="outline" onClick={() => setDarkMode(!darkMode)} className="w-full text-white border-white/40">
                {darkMode ? 'SWITCH TO LIGHT THEME' : 'SWITCH TO DARK THEME'}
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-12">
        
        {/* 2️⃣ INTRO / PURPOSE SECTION */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="bg-govBlue p-3 hidden sm:block">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2">
                Understanding Indian Government Schemes Simplified
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
                The GovScheme AI portal is designed to help citizens navigate the vast landscape of welfare benefits. 
                Whether you are a farmer, student, or entrepreneur, simply describe your situation to receive a 
                clear, concise summary of eligible schemes, benefits, and step-by-step application guidance.
              </p>
            </div>
          </div>
        </section>

        {/* 3️⃣ QUERY INPUT SECTION (Gov Form Style) */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
             <div className="bg-govBlue p-1.5">
                <Search className="text-white h-4 w-4" />
             </div>
             <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">Citizen Inquiry Form (Digital India)</h3>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="query" className="block text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 mb-2 tracking-widest">
                  Enter your query or describe your personal situation *
                </label>
                <textarea
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="E.g. I am a small-scale farmer from Maharashtra looking for crop insurance or subsidy schemes..."
                  className="w-full p-4 text-base bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:border-govBlue dark:focus:border-blue-500 focus:ring-0 rounded-none dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 min-h-[140px] transition-all"
                  disabled={isLoading}
                />
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">(*) Mandatory field for scheme assessment.</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 pt-6 border-t border-slate-100 dark:border-slate-800">
               <div className="w-full lg:w-auto">
                 <span className="text-[10px] font-black uppercase text-slate-400 block mb-3 tracking-widest">Citizen Categories (Quick Fill):</span>
                 <div className="flex flex-wrap gap-2">
                   {CATEGORIES.map((cat) => (
                      <button
                        key={cat.label}
                        onClick={() => setQuery(cat.query)}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-govBlue dark:hover:border-blue-500 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase transition-all whitespace-nowrap"
                      >
                        {cat.icon} {cat.label}
                      </button>
                   ))}
                 </div>
               </div>
               
               <Button onClick={handleSearch} isLoading={isLoading} disabled={!query.trim()} className="w-full lg:w-64">
                 Get Scheme Details <ArrowRight className="ml-2 h-4 w-4" />
               </Button>
            </div>
          </div>
        </section>

        {/* 4️⃣ AI RESPONSE SECTION */}
        <div ref={resultRef} className="scroll-mt-24">
          {isLoading && (
            <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 text-center">
               <div className="flex flex-col items-center gap-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-none border border-blue-100 dark:border-blue-900/30">
                     <Landmark className="h-10 w-10 text-govBlue dark:text-blue-500 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                     <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-base">Processing Citizen Request</h4>
                     <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Retrieving Official Policy Information via AI Pipeline</p>
                  </div>
               </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-600 p-6 flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0" />
              <div className="space-y-1">
                 <p className="text-[11px] font-black uppercase text-red-600 tracking-widest">Inquiry Error</p>
                 <p className="text-sm text-red-800 dark:text-red-400 font-bold">{error}</p>
              </div>
            </div>
          )}

          {response && <ResponseCard content={response} />}
        </div>

        {/* 5️⃣ HOW THIS HELPS / SERVICE OBJECTIVES */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
             <div className="h-1 w-12 bg-govBlue"></div>
             <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Portal Objectives</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Awareness", icon: UserCheck, text: "Reduces confusion and ensures reach of benefits to citizens." },
              { label: "Accessibility", icon: GraduationCap, text: "Simplifies complex official documents into plain language." },
              { label: "Support", icon: Briefcase, text: "Assists students, farmers and workers in finding subsidies." },
              { label: "Multilingual", icon: HeartPulse, text: "Supports English, Hindi, and Hinglish for inclusive reach." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 hover:border-govBlue dark:hover:border-blue-500 transition-colors">
                 <item.icon className="h-10 w-10 text-govBlue dark:text-blue-500 mb-6" />
                 <h4 className="text-[12px] font-black uppercase text-slate-900 dark:text-white mb-3 tracking-widest">{item.label}</h4>
                 <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6️⃣ HELP & DISCLAIMER SECTION */}
        <section className="bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
           <div className="flex items-center gap-3 mb-4">
             <HelpCircle className="w-5 h-5 text-slate-500" />
             <h3 className="text-sm font-black uppercase tracking-widest text-slate-700 dark:text-slate-300">Frequently Asked Questions & Help</h3>
           </div>
           <div className="space-y-4">
             <details className="group border-b border-slate-200 dark:border-slate-800 pb-3">
               <summary className="list-none flex justify-between items-center cursor-pointer text-sm font-bold uppercase tracking-tight text-slate-800 dark:text-slate-200">
                 How does the AI simplify schemes?
                 <ArrowRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
               </summary>
               <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                 Our system uses Google Gemini AI to analyze extensive official gazette documents and extract only the most critical information relevant to individual citizens.
               </p>
             </details>
             <details className="group border-b border-slate-200 dark:border-slate-800 pb-3">
               <summary className="list-none flex justify-between items-center cursor-pointer text-sm font-bold uppercase tracking-tight text-slate-800 dark:text-slate-200">
                 Is this an official government app?
                 <ArrowRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
               </summary>
               <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                 No, this is a prototype powered by AI to aid digital literacy. Always cross-check findings with <strong>india.gov.in</strong> or official department websites.
               </p>
             </details>
           </div>
        </section>

      </main>

      {/* 7️⃣ FOOTER (Official Style) */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-auto pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
             <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                   <Landmark className="h-10 w-10 text-govBlue dark:text-blue-500" />
                   <div className="flex flex-col">
                      <span className="text-lg font-black uppercase tracking-tighter">GovScheme Portal</span>
                      <span className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.2em]">National Informatics Project</span>
                   </div>
                </div>
                <p className="text-[12px] text-slate-500 dark:text-slate-500 leading-relaxed font-bold uppercase tracking-widest max-w-sm">
                  Empowering citizens through AI-assisted information simplification. A Digital India initiative prototype.
                </p>
                <div className="flex gap-4">
                  <div className="h-8 w-12 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"></div>
                  <div className="h-8 w-12 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"></div>
                  <div className="h-8 w-12 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"></div>
                </div>
             </div>
             
             <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div className="space-y-4">
                   <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-900 pb-2">Information</h6>
                   <ul className="text-[10px] font-bold text-slate-500 dark:text-slate-400 space-y-3 uppercase tracking-wider">
                      <li><a href="#" className="hover:text-govBlue dark:hover:text-blue-500 flex items-center gap-1">Portal Policy <ExternalLink className="h-3 w-3" /></a></li>
                      <li><a href="#" className="hover:text-govBlue dark:hover:text-blue-500 flex items-center gap-1">Privacy Policy <ExternalLink className="h-3 w-3" /></a></li>
                      <li><a href="#" className="hover:text-govBlue dark:hover:text-blue-500 flex items-center gap-1">Disclaimer <ExternalLink className="h-3 w-3" /></a></li>
                   </ul>
                </div>
                <div className="space-y-4">
                   <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-900 pb-2">Official Portals</h6>
                   <ul className="text-[10px] font-bold text-slate-500 dark:text-slate-400 space-y-3 uppercase tracking-wider">
                      <li><a href="https://india.gov.in" target="_blank" className="hover:text-govBlue dark:hover:text-blue-500 flex items-center gap-1 text-slate-700 dark:text-slate-400">India.gov.in <ExternalLink className="h-3 w-3" /></a></li>
                      <li><a href="https://mygov.in" target="_blank" className="hover:text-govBlue dark:hover:text-blue-500 flex items-center gap-1 text-slate-700 dark:text-slate-400">MyGov.in <ExternalLink className="h-3 w-3" /></a></li>
                      <li><a href="https://digitalindia.gov.in" target="_blank" className="hover:text-govBlue dark:hover:text-blue-500 flex items-center gap-1 text-slate-700 dark:text-slate-400">Digital India <ExternalLink className="h-3 w-3" /></a></li>
                   </ul>
                </div>
             </div>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
              © 2025 GovScheme Simplifier AI | Developed for Educational Purposes
            </div>
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 px-4 py-2 border border-slate-100 dark:border-slate-800">
               <span className="text-[10px] font-black text-slate-500 uppercase">Powered by Google Gemini AI</span>
               <div className="h-3 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
               <span className="text-[10px] font-black text-govBlue dark:text-blue-500 uppercase tracking-tighter">BETA VERSION 2.5</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;