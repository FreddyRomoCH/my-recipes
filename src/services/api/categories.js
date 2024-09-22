import { DB_URL } from "../../utils/constant.js"

export const categoriesList = async () => {
  const response = await fetch(`${DB_URL}/categories`, {
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
