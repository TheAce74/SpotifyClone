import { MONTHS_ARRAY, PASSWORD_REGEX } from "@/lib/constants";
import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .min(1, "Email is required.")
    .email(
      "This email is invalid. Make sure it's written like example@email.com.",
    ),
});

export const passwordSchema = z.object({
  password: z
    .string({ required_error: "Password is required." })
    .min(1, "Password is required.")
    .min(10, "Password must be at least 10 characters.")
    .regex(
      PASSWORD_REGEX,
      "Password must contain at least one letter, and one number or special character.",
    ),
});

export const detailsSchema = z.object({
  name: z
    .string({
      required_error: "Enter a name for your profile.",
    })
    .min(1, "Enter a name for your profile."),
  dayOfMonth: z.coerce
    .number({
      required_error:
        "Please enter the day of your birth date by entering a number between 1 and 31.",
    })
    .int()
    .min(
      1,
      "Please enter the day of your birth date by entering a number between 1 and 31.",
    )
    .max(
      31,
      "Please enter the day of your birth date by entering a number between 1 and 31.",
    ),
  monthOfYear: z.enum(MONTHS_ARRAY, {
    required_error: "Select your birth month.",
  }),
  year: z.coerce
    .number({
      required_error: "Please enter a birth year from 1900 onwards.",
    })
    .int()
    .min(1900, "Please enter a birth year from 1900 onwards.")
    .max(
      new Date().getFullYear(),
      "You're too young to create a Spotify account.",
    ),
  gender: z.enum(["Male", "Female", "Private"]),
});

export const signUpSchema = emailSchema.and(passwordSchema).and(detailsSchema);

export const signInSchema = emailSchema.and(passwordSchema);
