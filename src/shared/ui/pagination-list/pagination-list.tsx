import React, { useEffect, useState } from 'react';
import { Button } from '../button/button';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const PaginationList: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const [pages, setPages] = useState<number[]>([]);
  const [pageCurrent, setPage] = useState<number>(currentPage);

  useEffect(() => {
    if (totalPages > 1) {
      const visiblePageButtonCount = 3;
      let numberOfButtons = totalPages < visiblePageButtonCount ? totalPages : visiblePageButtonCount;
      const pageIndices = [pageCurrent];
      numberOfButtons--;
      [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
        const pageNumberBefore = pageIndices[0] - 1;
        const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
        if (pageNumberBefore >= 1 && (itemIndex < numberOfButtons / 2 || pageNumberAfter > totalPages)) {
          pageIndices.unshift(pageNumberBefore);
        } else {
          pageIndices.push(pageNumberAfter);
        }
      });
      setPages(pageIndices);
    } else {
      setPages([]);
    }
  }, [pageCurrent, totalPages]);

  const handlePageChange = (page: number) => {
    setPage(page);
    onPageChange(page);
  };

  return pages.length > 0 ? (
    <nav>
      <ul className='flex'>
        {pageCurrent > 1 && (
          <li className={`page-item`}>
            <Button onClick={() => handlePageChange(pageCurrent - 1)}>Пред</Button>
          </li>
        )}
        {pages.map((page) => (
          <li key={page}>
            <Button
              className='mx-1'
              onClick={() => handlePageChange(page)}
              variant={pageCurrent === page ? 'default' : 'outline'}
            >
              {page}
            </Button>
          </li>
        ))}
        {pageCurrent < totalPages && (
          <li>
            <Button onClick={() => handlePageChange(pageCurrent + 1)}>След</Button>
          </li>
        )}
      </ul>
    </nav>
  ) : null;
};
