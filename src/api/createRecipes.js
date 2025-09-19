import { API_URL } from "../utils/config"

export const postRecipes = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/recipes`, {
            method: "POST",
            body: formData,
        })

        if (!response.ok) {
            return { error: 'Error posting recipes' }
        }

        const result = await response.json()
    
        if (result.error) {
            return { error: result.error }
        }
    
        return { success: result.success, data: result.data }

    } catch (error) {
        console.error('Post recipes error:', error)
        return { error: 'Error posting recipes' }
    }
}