import { useEffect, useState } from "react";
import { DB_URL } from "../utils/constant";
import { useAuth } from "./useAuth.js";
import axios from "axios";

export function useUser () {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { userDetails } = useAuth();

    const fetchUsers = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${DB_URL}/users`)

            setUsers(response.data)
            return response.data
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const getUserImage = () => {
        // Get the user image from global state
        const profile_picture = userDetails && (userDetails.profile_picture === "" || userDetails.profile_picture === null)
          ? "/images/profile.jpg"
          : `${DB_URL}/uploads/${userDetails?.profile_picture}`;

          return profile_picture
    }

    const getUsers = () => {
        if (loading) {
            return null
        }

        if (error) {
            return error
        }

        return users
    }

    return { getUserImage, getUsers }
}