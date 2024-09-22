import { DB_URL } from "../utils/constant";

export const apiUpdateUser = async (updateDetails) => {
    try {
        const response = await fetch(`${DB_URL}/users/${updateDetails.get('userId')}`, {
          method: "PATCH",
          body: updateDetails,
        });
  
        const result = await response.json().catch(() => {
            return { error: 'Invalid JSON response' }
        });
  
        if (response.status === 404) {
          console.log('result:', result.error)
          return { error: result.error }
        }
  
        if (response.status === 500) {
          console.log('result:', result.error)
          return { error: result.error }
        }
    
        if (response.status === 200) {
          return { message: result.message, data: result.data }
        }else{
          return { error: 'Error updating user' }
        }
  
      } catch(error) {
        console.error('update error:', error);
        return { error: 'Error updating user' }
      }
}