import { DB_URL } from "../utils/constant";
import { useAuth } from "./useAuth.js";

export function useUser () {
    const { userDetails } = useAuth();

    const getUserImage = () => {
        // Get the user image from global state
        const profile_picture = userDetails && (userDetails.profile_picture === "" || userDetails.profile_picture === null)
          ? "/images/profile.jpg"
          : `${DB_URL}/uploads/${userDetails?.profile_picture}`;

          return profile_picture
    }

    return { getUserImage }
}