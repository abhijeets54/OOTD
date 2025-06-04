// StyledFormComponents.tsx
import React from 'react';
import { motion } from 'framer-motion';

export const FormQuestion = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`mb-8 ${className}`}
  >
    {children}
  </motion.div>
);

export const QuestionLabel = ({ children }) => (
  <label className="block text-xl font-medium bg-gradient-to-r from-rose-600 to-indigo-600 bg-clip-text text-transparent mb-3">
    {children}
  </label>
);

export const RadioGroup = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    {children}
  </div>
);

export const RadioOption = ({ selected, onClick, icon: Icon, label }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`
      relative cursor-pointer rounded-xl p-4 
      ${selected 
        ? 'bg-gradient-to-r from-rose-100 to-indigo-100 border-2 border-rose-400' 
        : 'bg-white/50 border-2 border-transparent hover:bg-white/70'
      }
      transition-all duration-200
    `}
  >
    <div className="flex items-center space-x-3">
      {Icon && <Icon className={`w-5 h-5 ${selected ? 'text-rose-600' : 'text-gray-400'}`} />}
      <span className={`font-medium ${selected ? 'text-rose-600' : 'text-gray-600'}`}>
        {label}
      </span>
    </div>
    {selected && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center"
      >
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
    )}
  </motion.div>
);

export const Select = ({ children, ...props }) => (
  <select
    {...props}
    className="
      w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-transparent
      focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/20
      transition-all duration-200
    "
  >
    {children}
  </select>
);

export const Button = ({ children, primary, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`
      px-6 py-3 rounded-xl font-medium transition-all duration-200
      ${primary 
        ? 'bg-gradient-to-r from-rose-500 to-indigo-500 text-white shadow-lg shadow-rose-500/20'
        : 'bg-white/50 text-gray-700 hover:bg-white/70'
      }
    `}
    {...props}
  >
    {children}
  </motion.button>
);