import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // .env ফাইলের আসল নাম অনুযায়ী BETTER_AUTH_URL ব্যবহার করুন
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000"
});

export const {
    signIn,
    signUp,
    signOut,
    useSession,
} = authClient;