import React, { useState, useEffect } from 'react';
import { Search, Heart, Filter, AlertCircle } from 'lucide-react';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';
import FilterOptions from './components/FilterOptions';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { Recipe } from './types';
import { searchRecipes, getRandomRecipes } from './api';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    diet: '',
    intolerances: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  const fetchRandomRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await getRandomRecipes();
      setRecipes(results);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const results = await searchRecipes(searchTerm, filters);
      setRecipes(results);
      if (results.length === 0) {
        setError('No recipes found. Try different search terms or filters.');
      }
    } catch (err) {
      setError('An error occurred while searching for recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (recipe: Recipe) => {
    setFavoriteRecipes((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === recipe.id);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== recipe.id);
      } else {
        return [...prevFavorites, recipe];
      }
    });
  };

  const displayedRecipes = showFavorites ? favoriteRecipes : recipes;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-green-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center">
            <Search className="mr-2" /> Recipe Finder
          </h1>
          <nav>
            <button
              className={`p-2 rounded transition duration-300 ease-in-out ${
                showFavorites ? 'bg-green-700' : 'hover:bg-green-700'
              }`}
              onClick={() => setShowFavorites(!showFavorites)}
            >
              <Heart className="inline-block mr-1" /> 
              {showFavorites ? 'All Recipes' : 'Favorites'}
            </button>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4 flex-grow">
        <div className="flex flex-col md:flex-row mb-6">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
          />
          <FilterOptions filters={filters} setFilters={setFilters} />
        </div>
        {error && <ErrorMessage message={error} />}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <RecipeList
            recipes={displayedRecipes}
            favoriteRecipes={favoriteRecipes}
            toggleFavorite={toggleFavorite}
          />
        )}
      </main>
      <footer className="bg-green-600 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Recipe Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;