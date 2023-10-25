import React, { ReactNode } from 'react';

export interface ContentProps {
  className?: string;
  children: ReactNode;
}

export const Content: React.FC<ContentProps> = ({ className, children }) => {
  return <div className={`max-w-screen-2xl mx-auto p-4 ${className}`}>{children}</div>;
};
