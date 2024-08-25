import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;

    if (totalPages <= maxPagesToShow + 2) {
      // Show all pages if total pages are less than or equal to maxPagesToShow + 2
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <div
            key={i}
            className={`${styles.pageNumber} ${i === currentPage ? styles.active : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </div>
        );
      }
    } else {
      // Show first few pages, then ellipsis, then the last page
      if (currentPage <= maxPagesToShow) {
        for (let i = 1; i <= maxPagesToShow; i++) {
          pageNumbers.push(
            <div
              key={i}
              className={`${styles.pageNumber} ${i === currentPage ? styles.active : ''}`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </div>
          );
        }
        pageNumbers.push(
          <div key="ellipsis" className={styles.pageNumber}>
            ...
          </div>
        );
        pageNumbers.push(
          <div
            key={totalPages}
            className={`${styles.pageNumber} ${totalPages === currentPage ? styles.active : ''}`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </div>
        );
      } else if (currentPage > totalPages - maxPagesToShow) {
        pageNumbers.push(
          <div
            key={1}
            className={`${styles.pageNumber} ${1 === currentPage ? styles.active : ''}`}
            onClick={() => handlePageChange(1)}
          >
            1
          </div>
        );
        pageNumbers.push(
          <div key="ellipsis" className={styles.pageNumber}>
            ...
          </div>
        );
        for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
          pageNumbers.push(
            <div
              key={i}
              className={`${styles.pageNumber} ${i === currentPage ? styles.active : ''}`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </div>
          );
        }
      } else {
        pageNumbers.push(
          <div
            key={1}
            className={`${styles.pageNumber} ${1 === currentPage ? styles.active : ''}`}
            onClick={() => handlePageChange(1)}
          >
            1
          </div>
        );
        pageNumbers.push(
          <div key="ellipsis1" className={styles.pageNumber}>
            ...
          </div>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <div
              key={i}
              className={`${styles.pageNumber} ${i === currentPage ? styles.active : ''}`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </div>
          );
        }
        pageNumbers.push(
          <div key="ellipsis2" className={styles.pageNumber}>
            ...
          </div>
        );
        pageNumbers.push(
          <div
            key={totalPages}
            className={`${styles.pageNumber} ${totalPages === currentPage ? styles.active : ''}`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </div>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.arrow} onClick={() => handlePageChange(currentPage - 1)}>
        &lt;
      </div>
      {renderPageNumbers()}
      <div className={styles.arrow} onClick={() => handlePageChange(currentPage + 1)}>
        &gt;
      </div>
    </div>
  );
};

export default Pagination;
