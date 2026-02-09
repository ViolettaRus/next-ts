import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let firebaseAdminApp: App | null = null;

function createFirebaseAdminApp(): App {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin environment variables. Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.",
    );
  }

  const existingApps = getApps();
  if (existingApps.length > 0) {
    return existingApps[0]!;
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export function getFirebaseAdminApp(): App {
  if (!firebaseAdminApp) {
    firebaseAdminApp = createFirebaseAdminApp();
  }

  return firebaseAdminApp;
}

export const adminDb = getFirestore(getFirebaseAdminApp());

