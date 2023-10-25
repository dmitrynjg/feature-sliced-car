import React from 'react';

export const NumberFormatter: React.FC<{ number: number }> = ({ number }) => {
  const stringNumber = String(number);
  let formatNumber = Math.trunc(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  const fractionalIndex = stringNumber.indexOf('.');

  if (fractionalIndex !== -1) {
    formatNumber += `,${stringNumber.slice(fractionalIndex + 1, stringNumber.length)}`;
  }

  return <span>{formatNumber}</span>;
};

