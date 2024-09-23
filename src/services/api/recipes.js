import { DB_URL } from "../../utils/constant.js"

// export const recipesList = async () => {
//     try {
//         const response = await fetch(`${DB_URL}/recipes`);

//         if (!response.ok) {
//         return { error: response.error }
//         }

//         const data = await response.json();

//         if (data.error) {
//           return { error: data.error }
//         }

//         return data;
//       } catch (error) {
//         console.error('Failed to fetch recipes:', error);
//         return { error, message: 'Failed to fetch recipes' }
//       }
// }

export const recipesList = async () => {
  
  return await fetch(`${DB_URL}/recipes`)
    .then(res => {
      if (res.status >= 500 && res.status < 600) {
        return { error: "Server error" }
      }

      if (!res.ok) {
        return { error: "Error receiving the recipes" }
      }

      return res.json()
    })
    .then(data => {
      if (data.error) {
        return { error: data.error }
      }

      return data
    })
}