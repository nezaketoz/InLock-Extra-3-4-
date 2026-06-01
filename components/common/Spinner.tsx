import React from 'react';
export const Spinner: React.FC<{ size?: string; color?: string }> = ({ size = 'w-5 h-5', color = 'border-slate-400' }) => (
  <div className={`${size} border-2 border-slate-200 ${color} rounded-full animate-spin`} style={{ borderTopColor: 'transparent' }} />
);
