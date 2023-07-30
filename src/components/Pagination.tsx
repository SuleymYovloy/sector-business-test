import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="flex items-center justify-center my-4">
      <button
        className={`bg-secondary-bg text-white py-2 px-4 rounded-l-md ${currentPage === 1 ? 'opacity-50 cursor-default' : 'cursor-pointer'}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Назад
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index + 1}
          className={`mx-1 px-3 py-2 rounded-md ${currentPage === index + 1 ? 'bg-primary' : 'bg-secondary-bg text-white cursor-pointer'}`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`bg-secondary-bg text-white py-2 px-4 rounded-r-md ${currentPage === totalPages ? 'opacity-50 cursor-default' : 'cursor-pointer'}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Далее
      </button>
    </div>
  );
};

export default Pagination;