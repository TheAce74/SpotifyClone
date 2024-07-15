import { Models } from "appwrite";

export type Profile = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  createdAt: string;
  passwordHash: string;
  gender: "Male" | "Female" | "Private" | null;
  dob: string | null;
};

export type AppwriteProfile = Models.Document & Profile;

export type PageParams = {
  params: { slug: string };
};

export type PageSearchParams = {
  searchParams: { [key: string]: string | string[] | undefined };
};
