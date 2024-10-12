import React, { useState } from 'react';
import { Heart, Clock, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isFavorite, toggleFavorite }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" / >
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
        <p className="text-gray-600 mb-4">
          {expanded ? recipe.summary : `${recipe.summary.slice(0, 100)}...`}
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500 flex items-center">
            <Clock className="w-4 h-4 mr-1" /> {recipe.readyInMinutes} min
          </span>
          <span className="text-sm text-gray-500 flex items-center">
            <Users className="w-4 h-4 mr-1" /> {recipe.servings} servings
          </span>
        </div>
        {recipe.nutrition && (
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Nutrition (per serving):</h3>
            <ul className="text-sm text-gray-600">
              {recipe.nutrition.nutrients.map((nutrient) => (
                <li key={nutrient.name}>
                  {nutrient.name}: {nutrient.amount}{nutrient.unit}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-green-600 hover:text-green-700 transition duration-300 ease-in-out"
          >
            {expanded ? (
              <>
                <ChevronUp className="inline-block mr-1" /> Show less
              </>
            ) : (
              <>
                <ChevronDown className="inline-block mr-1" /> Show more
              </>
            )}
          </button>
          <button
            onClick={toggleFavorite}
            className={`transition duration-300 ease-in-out ${
              isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={isFavorite ? 'fill-current' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;