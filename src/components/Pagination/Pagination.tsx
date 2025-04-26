import { forwardRef } from 'react';
import styles from './pagination.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import Button from '../Button/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const cx = classNames.bind(styles);

const Pagination = forwardRef<HTMLDivElement, PaginationProps>((
  { currentPage, totalPages, onPageChange }, ref) => {
  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div ref={ref} className={classNames(styles.wrapper,classNames)}>
      {/* <div className={styles.pagination}> */}
      {/* firts page */}
      <span>Page {currentPage} of {totalPages}</span>
      <span> | </span>
      <Button className={cx('btn')} onClick={() => handlePageChange(1)} >
        First
      </Button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      {/* last page */}
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
});

export default Pagination;