import React from 'react';
import { Recipe } from '../types';
import RecipeCard from './RecipeCard';

interface RecipeListProps {
    recipes: Recipe[];
    favoriteRecipes: Recipe[];
    toggleFavorite: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, favoriteRecipes, toggleFavorite }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
            <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={favoriteRecipes.some((fav) => fav.id === recipe.id)}
            toggleFavorite={() => toggleFavorite(recipe)}
            />
        ))}
        </div>
    );
};

export default RecipeList;