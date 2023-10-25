import React from 'react';

export interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return <div className={`text-bold ${className}`}>Автомобили</div>;
};