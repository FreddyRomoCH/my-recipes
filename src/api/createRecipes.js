import { DB_URL } from "../utils/constant"

export const postRecipes = async (formData) => {
    try {
        const response = await fetch(`${DB_URL}/recipes`, {
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