import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

type FirebaseClientConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
};

function getFirebaseClientConfig(): FirebaseClientConfig {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!apiKey || !authDomain || !projectId) {
    throw new Error(
      "Missing NEXT_PUBLIC_FIREBASE_* environment variables for client Firebase initialization.",
    );
  }

  return {
    apiKey,
    authDomain,
    projectId,
  };
}

let firebaseClientApp: FirebaseApp;

export function getFirebaseClientApp(): FirebaseApp {
  if (!firebaseClientApp) {
    const existingApps = getApps();
    firebaseClientApp =
      existingApps.length > 0
        ? existingApps[0]!
        : initializeApp(getFirebaseClientConfig());
  }

  return firebaseClientApp;
}

export const clientDb = getFirestore(getFirebaseClientApp());

