import { z } from "zod";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "../utils/constant.js";

const recipesSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        parse_error: "Title must be a string"
    }).min(1, {
        message: "Title can not be empty",
    }),
    description: z.string({
        required_error: "Description is required",
        parse_error: "Description must be a string"
    }).min(1, {
        message: "Description can not be empty",
    }),
    main_image: z.any().refine((fileList) => {
        const file = fileList[0];
        // Ensure the file is provided
        if (!file) {
            return false; // File is required
        }

        // Check file size and type
        const isValidSize = file.size <= MAX_FILE_SIZE;
        const isValidType = ACCEPTED_IMAGE_TYPES.includes(file.type);

        return isValidSize && isValidType;
    }, {
        message: "Max file size is 5MB and only jpeg, jpg, png, and webp files are allowed",
    }),
    servings: z.string().min(1, {
        message: "Servings must be at least 1"
    }).max(20, {
        message: "Servings must be at most 20"
    }),
    prep_time: z.string({
        required_error: "Prep time is required"
    }),
    country: z.string({
        required_error: "Country is required",
        parse_error: "Country must be a string"
    }).min(1, {
        message: "Country can not be empty",
    }),
    ingredients: z.array(z.string()).min(1, "At least one ingredient is required"),
    instructions: z.array(z.string()).min(1, "At least one instruction is required"),
    categories: z.array(z.string()).min(1, "At least one category is required"),
})

export const addRecipeSchema = recipesSchema.pick({
    title: true,
    description: true,
    main_image: true,
    servings: true,
    prep_time: true,
    country: true,
    ingredients: true,
    instructions: true,
    categories: true
})