import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../utils/constant";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    first_name: z.string().regex(/^[a-zA-Z]+$/, {
      message: "First name must contain only letters",
    }),
    last_name: z.string().regex(/^[a-zA-Z]+$/, {
      message: "Last name must contain only letters",
    }),
    username: z
      .string()
      .min(3, {
        message: "Username must be at least 3 characters long",
      })
      .max(20, {
        message: "Username must be at most 20 characters long",
      }),
    country: z
      .string({
        required_error: "Country is required",
        parse_error: "Country must be a string",
      })
      .regex(/^[a-zA-Z]+$/i, "Country must contain only letters"),
    profile_picture: z.optional(
      z
        .any()
        .refine((file) => {
          if (!file || file.length === 0) {
            return true; // If file is not provided, it's valid because it's optional
          }
          return file[0].size <= MAX_FILE_SIZE;
        }, `Max file size is 5MB`)
        .refine((file) => {
          if (!file || file.length === 0) {
            return true; // If file is not provided, it's valid because it's optional
          }
          return ACCEPTED_IMAGE_TYPES.includes(file[0].type);
        }, "Only jpeg, jpg, png, and webp files are allowed")
    ),
  });

  export const loginSchema = schema.pick({
    email: true,
    password: true,
  })

  export const registerSchema = schema.pick({
    email: true,
    password: true,
    first_name: true,
    last_name: true,
    username: true,
    country: true,
    profile_picture: true,
  })

  export const updateSchema = schema.pick({
    password: true,
    first_name: true,
    last_name: true,
    username: true,
    country: true,
    profile_picture: true,
  })