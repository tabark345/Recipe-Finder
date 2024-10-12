import React from 'react';
import { Filter } from 'lucide-react';

interface FilterOptionsProps {
    filters: {
        diet: string;
        intolerances: string;
    };
    setFilters: (filters: { diet: string; intolerances: string }) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ filters, setFilters }) => {
    return (
        <div className="flex items-center">
        <select
            value={filters.diet}
            onChange={(e) => setFilters({ ...filters, diet: e.target.value })}
            className="p-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300 ease-in-out"
        >
            <option value="">Diet</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="paleo">Paleo</option>
        </select>
        <select
            value={filters.intolerances}
            onChange={(e) => setFilters({ ...filters, intolerances: e.target.value })}
            className="p-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300 ease-in-out"
        >
            <option value="">Intolerances</option>
            <option value="dairy">Dairy</option>
            <option value="egg">Egg</option>
            <option value="gluten">Gluten</option>
            <option value="peanut">Peanut</option>
            <option value="seafood">Seafood</option>
            <option value="soy">Soy</option>
        </select>
        <button className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300 ease-in-out">
            <Filter />
        </button>
        </div>
    );
};

export default FilterOptions;