import { ID, Query, databases } from "@/lib/appwrite";
import { MONTHS_OBJECT } from "@/lib/constants";
import { signInSchema, signUpSchema } from "@/lib/schema";
import { AppwriteProfile, Profile } from "@/lib/types";
import { encrypt, getErrorMessage } from "@/lib/utils";
import { Models } from "appwrite";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import Spotify from "next-auth/providers/spotify";

const signInAppwrite = async (
  email: string,
  passwordHash?: string,
): Promise<Models.DocumentList<AppwriteProfile>> => {
  return await databases.listDocuments<AppwriteProfile>(
    process.env.APPWRITE_DATABASE_ID ?? "",
    process.env.APPWRITE_PROFILES_COLLECTION_ID ?? "",
    passwordHash
      ? [Query.equal("passwordHash", passwordHash), Query.equal("email", email)]
      : [Query.equal("email", email)],
  );
};

const signUpAppwrite = async (
  profile: Omit<Profile, "createdAt" | "id">,
): Promise<AppwriteProfile | null> => {
  const user = await signInAppwrite(profile.email);
  if (user.documents.length > 0) {
    return null;
  } else {
    const userId = ID.unique();
    return await databases.createDocument<AppwriteProfile>(
      process.env.APPWRITE_DATABASE_ID ?? "",
      process.env.APPWRITE_PROFILES_COLLECTION_ID ?? "",
      userId,
      { ...profile, createdAt: new Date(), id: userId },
    );
  }
};

const syncWithAppwrite = async (
  profile: Omit<Profile, "createdAt" | "id">,
): Promise<Profile | null> => {
  try {
    const user = await signInAppwrite(profile.email, profile.passwordHash);

    if (user.documents.length === 0) {
      try {
        const user = await signUpAppwrite(profile);

        if (!user) {
          return null;
        }

        const { id, name, email, passwordHash, image, createdAt, dob, gender } =
          user;
        return {
          id,
          name,
          email,
          passwordHash,
          image,
          createdAt,
          dob,
          gender,
        };
      } catch (error) {
        console.error(getErrorMessage(error));
        return null;
      }
    } else {
      const { id, name, email, passwordHash, image, createdAt, dob, gender } =
        user.documents[0];
      return { id, name, email, passwordHash, image, createdAt, dob, gender };
    }
  } catch (error) {
    console.error(getErrorMessage(error));
    return null;
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    // signIn: "/login",
  },
  providers: [
    Google,
    Facebook,
    Spotify,
    Credentials({
      credentials: {
        email: {},
        password: {},
        name: {},
        dayOfMonth: {},
        monthOfYear: {},
        year: {},
        gender: {},
      },
      authorize: async (credentials) => {
        let user: Profile | null = null;

        const validatedSignUpCredentials =
          await signUpSchema.safeParseAsync(credentials);

        const validatedSignInCredentials =
          await signInSchema.safeParseAsync(credentials);

        if (
          !validatedSignInCredentials.success &&
          !validatedSignUpCredentials.success
        ) {
          throw new Error("Some fields are missing");
        }

        if (validatedSignUpCredentials.success) {
          const {
            email,
            password,
            name,
            dayOfMonth,
            monthOfYear,
            year,
            gender,
          } = validatedSignUpCredentials.data;

          user = await signUpAppwrite({
            email,
            passwordHash: encrypt(password, 10),
            name,
            dob: new Date(
              year,
              MONTHS_OBJECT[monthOfYear],
              dayOfMonth,
            ).toISOString(),
            gender,
            image: null,
          });

          if (!user) {
            throw new Error("An unexpected error occurred.");
          }
        }

        if (validatedSignInCredentials.success) {
          const { email, password } = validatedSignInCredentials.data;

          const profile = await signInAppwrite(email, encrypt(password, 10));

          if (profile.documents.length > 0) {
            const {
              id,
              name,
              userEmail,
              passwordHash,
              image,
              createdAt,
              dob,
              gender,
            } = profile.documents[0];
            user = {
              id,
              name,
              email: userEmail,
              passwordHash,
              image,
              createdAt,
              dob,
              gender,
            };
          } else {
            throw new Error("User not found.");
          }
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        const profile: Omit<Profile, "createdAt" | "id"> = {
          name: user.name ?? "User",
          email: user.email ?? "example@email.com",
          image: user.image === undefined ? null : user.image,
          passwordHash: encrypt(user.email ?? "example@email.com", 10),
          dob: null,
          gender: null,
        };
        await syncWithAppwrite(profile);
      }
      return true;
    },
  },
});
