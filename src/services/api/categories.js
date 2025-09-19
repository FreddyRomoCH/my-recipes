import { API_URL } from "../../utils/config.js"

export const categoriesList = async () => {
  const response = await fetch(`${API_URL}/categories`, {
    method: "GET",
    Headers: {
      "Content-Type": "application/json",
    }
  })

  if (response.error) {
    return { error: response.error }
  }

  const result = await response.json()

  return result
}
