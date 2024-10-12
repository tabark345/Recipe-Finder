export interface Recipe {
    id: number;
    title: string;
    image: string;
    summary: string;
    readyInMinutes: number;
    servings: number;
    nutrition?: {
        nutrients: {
        name: string;
        amount: number;
        unit: string;
        }[];
    };
}