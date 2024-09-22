export const DB_URL = process.env.URL_BACKEND || 'http://localhost:1234';
export const MAX_FILE_SIZE = 5242880;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const APP_STATUS = {
    IDLE: "idle", // No request made
    EDITING: "editing", // User is editing
    PENDING: "pending", // Request is being made
    SUCCESS: "success", // Request was successful
    ERROR: "error", // Request failed
  };