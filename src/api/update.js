import { API_URL } from "../utils/config";

export const apiUpdateUser = async (updateDetails) => {
    try {
        const response = await fetch(`${API_URL}/users/${updateDetails.get('userId')}`, {
          method: "PATCH",
          body: updateDetails,
        });
  
        const result = await response.json().catch(() => {
            return { error: 'Invalid JSON response' }
        });
  
        if (response.status === 404) {
          return { error: result.error }
        }
  
        if (response.status === 500) {
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