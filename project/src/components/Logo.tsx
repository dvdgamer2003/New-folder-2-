import React from 'react';

interface LogoProps {
  variant?: 'default' | 'purple';
  className?: string;
}

export default function Logo({ variant = 'default', className = '' }: LogoProps) {
  const logoUrl = variant === 'purple' 
    ? 'https://raw.githubusercontent.com/yourusername/resume-builder/main/public/logo-purple.png'
    : 'https://raw.githubusercontent.com/yourusername/resume-builder/main/public/logo.png';

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img 
        src={logoUrl} 
        alt="BuildDivine Logo" 
        className="w-10 h-10 object-contain"
      />
      <span className="text-2xl font-bold">BuildDivine</span>
    </div>
  );
}