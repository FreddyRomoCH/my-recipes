import { DB_URL } from "../utils/constant";

export const apiRegisterUser = async (registerDetails) => {
    try {
        const response = await fetch(`${DB_URL}/users/`, {
          method: "POST",
          body: registerDetails,
        });
  
        const result = await response.json().catch(() => {
          return { error: 'Invalid JSON response' }
        });
  
        if (response.status === 400) {
          return { error: result.error }
        }
  
        if (response.status === 404) {
          return { error: result.error }
        }
  
        if (response.status === 500) {
          return { error: result.error }
        }
    
        if (response.status === 201) {
          return { message: "success", email: registerDetails.get('email'), password: registerDetails.get('password') }
        }else{
          return { error: 'Error registering user' }
        }
  
      } catch(error) {
        console.error('Register error:', error);
        return { error: 'Error registering user' }
      }
}