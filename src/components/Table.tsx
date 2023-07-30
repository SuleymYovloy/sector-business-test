import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

const Table: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<keyof Post>('id');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const postsPerPage = 10;

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      setData(response.data);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset current page when search query changes
  }, [searchQuery]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (field: keyof Post) => {
    setSortField(field);
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue: string | number = a[sortField];
    const bValue: string | number = b[sortField];

    if (sortField === 'id') {
      return sortDirection === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    } else {
      return sortDirection === 'asc'
        ? (aValue as string).localeCompare(bValue as string)
        : (bValue as string).localeCompare(aValue as string);
    }
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedData.slice(indexOfFirstPost, indexOfLastPost);

  const renderSortArrow = (field: keyof Post) => {
    if (sortField === field) {
      return sortDirection === 'asc' ? (
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0.353553" y1="0.646447" x2="6.18011" y2="6.47301" stroke="#FCFCFC" />
          <line x1="5.64645" y1="6.30331" x2="11.3033" y2="0.646453" stroke="white" />
        </svg>
      ) : (
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0.353553" y1="6.47301" x2="6.18011" y2="0.646447" stroke="#FCFCFC" />
          <line x1="5.64645" y1="0.646453" x2="11.3033" y2="6.30331" stroke="white" />
        </svg>
      );
    }
    return (
      <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.353553" y1="0.646447" x2="6.18011" y2="6.47301" stroke="white" />
        <line x1="5.64645" y1="6.30331" x2="11.3033" y2="0.646453" stroke="#FCFCFC" />
      </svg>
    );
  };

  return (
    <div className="w-full h-full bg-white">
      <div className="mb-3 max-w-2xl flex">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch ">
          <input
            type="search"
            className="input text-white max-w-2xl w-full border border-solid border-neutral-900 outline-none bg-clip-padding px-3 py-[0.9rem] clear-left bg-primary-bg"
            placeholder="Поиск"
            aria-label="Поиск"
            aria-describedby="button-addon1"
            value={searchQuery}
            onChange={handleSearch}
          />
          <span
            className="absolute right-10 top-0 bottom-0 input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
            id="basic-addon2"
            data-te-ripple-color="light"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#fff" className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
      <table className="w-full">
        <thead className="bg-secondary-bg text-white">
          <tr>
            <th className="py-4 px-8 cursor-pointer" onClick={() => handleSort('id')}>
              ID {renderSortArrow('id')}
            </th>
            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort('title')}>
              Заголовок {renderSortArrow('title')}
            </th>
            <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort('body')}>
              Описание {renderSortArrow('body')}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id} className="border">
              <td className="py-2 px-4 border">{post.id}</td>
              <td className="py-2 px-4 border">{post.title}</td>
              <td className="py-2 px-4 border">{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between my-4">
        <button
          className={`py-2 px-4 rounded-l-md ${currentPage === 1 ? 'opacity-50 cursor-default' : 'cursor-pointer'}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ color: currentPage === 1 ? '#000000' : '#000000', background: 'none' }}
        >
          Назад
        </button>
        <div>
          {Array.from({ length: 5 }).map((_, index) => (
            <button
              key={index + 1}
              className={`mx-1 px-3 py-2 rounded-md ${
                currentPage === index + 1 ? 'text-white cursor-default' : 'text-black cursor-pointer'
              }`}
              onClick={() => handlePageChange(index + 1)}
              style={{ color: currentPage === index + 1 ? '#7EBC3C' : '#000000', background: 'none' }}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          className={`py-2 px-4 rounded-r-md ${currentPage === 5 ? 'opacity-50 cursor-default' : 'cursor-pointer'}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === 5}
          style={{ color: currentPage === 5 ? '#000000' : '#000000', background: 'none' }}
        >
          Далее
        </button>
      </div>
    </div>
  );
};

export default Table;
