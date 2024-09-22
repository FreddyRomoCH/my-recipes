import { DB_URL } from "../utils/constant";

export const getRecipes = async () => {
    const response = await fetch(`${DB_URL}/recipes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.error) {
        return { error: response.error };
    }

    const result = await response.json();

    return result;
}

export const getRecipeById = async (id) => {
    const response = await fetch(`${DB_URL}/recipes/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.error) {
        return { error: response.error };
    }

    const result = await response.json();

    return result;
}