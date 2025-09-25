
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background';

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover',
    secondary: 'bg-secondary text-text-primary hover:bg-opacity-80',
    ghost: 'bg-transparent text-text-primary hover:bg-surface',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
