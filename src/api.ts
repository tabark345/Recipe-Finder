import axios from 'axios';
import { Recipe } from './types';


const API_KEY = 'eff3e3f1e47c4367961691c23df3de57'; // Replace with your actual API key
const BASE_URL = 'https://api.spoonacular.com/recipes';

const extractRecipeData = (recipe: any): Recipe => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    summary: recipe.summary,
    readyInMinutes: recipe.readyInMinutes,
    servings: recipe.servings,
    nutrition: recipe.nutrition ? {
        nutrients: recipe.nutrition.nutrients.slice(0, 5).map((nutrient: any) => ({
        name: nutrient.name,
        amount: nutrient.amount,
        unit: nutrient.unit,
        })),
    } : undefined,
});

export const searchRecipes = async (query: string, filters: { diet: string; intolerances: string }): Promise<Recipe[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/complexSearch`, {
        params: {
            apiKey: API_KEY,
            query,
            diet: filters.diet,
            intolerances: filters.intolerances,
            addRecipeInformation: true,
            addRecipeNutrition: true,
            number: 9,
        },
        });
        return response.data.results.map(extractRecipeData);
    } catch (error) {
        console.error('Error searching recipes:', error);
        throw new Error('Failed to search recipes');
    }
};

export const getRandomRecipes = async (): Promise<Recipe[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/random`, {
        params: {
            apiKey: API_KEY,
            number: 9,
            addRecipeInformation: true,
            addRecipeNutrition: true,
        },
        });
        return response.data.recipes.map(extractRecipeData);
    } catch (error) {
        console.error('Error fetching random recipes:', error);
        throw new Error('Failed to fetch random recipes');
    }
};