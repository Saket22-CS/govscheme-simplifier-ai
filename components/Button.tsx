import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  isLoading, 
  variant = 'primary', 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/30 focus:ring-orange-500 dark:shadow-orange-900/20",
    secondary: "bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/30 focus:ring-teal-500",
    outline: "bg-transparent border-2 border-slate-200 dark:border-slate-700 hover:border-orange-500 text-slate-700 dark:text-slate-200 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-slate-800"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};