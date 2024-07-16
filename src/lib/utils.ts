import { render } from "@testing-library/react";
import clsx, { ClassValue } from "clsx";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import userEvent from "@testing-library/user-event";

export const cn = (...classes: ClassValue[]): string => {
  return twMerge(clsx(classes));
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export const encrypt = (text: string, shift: number): string => {
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }

      return char;
    })
    .join("");
};

export const decrypt = (text: string, shift: number): string => {
  return encrypt(text, 26 - shift);
};
