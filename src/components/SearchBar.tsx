import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex items-center mb-4 md:mb-0 md:mr-4">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300 ease-in-out"
      />
      <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300 ease-in-out"
      >
        <Search />
      </button>
    </form>
  );
};

export default SearchBar;