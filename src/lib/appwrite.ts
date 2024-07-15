import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT ?? "")
  .setProject(process.env.APPWRITE_PROJECT_ID ?? "");

export const databases = new Databases(client);
export { ID, Query } from "appwrite";
