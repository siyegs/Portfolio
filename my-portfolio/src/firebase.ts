// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// Values are read from environment variables (defined in .env)
const firebaseConfig: FirebaseOptions = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const requiredFirebaseConfig = [
    firebaseConfig.apiKey,
    firebaseConfig.projectId,
    firebaseConfig.appId,
];

const hasFirebaseConfig = requiredFirebaseConfig.every(Boolean);

// Keep the portfolio renderable in local dev even when .env is not configured.
const app: FirebaseApp | null = hasFirebaseConfig ? initializeApp(firebaseConfig) : null;
let analytics: Analytics | null = null;

if (app) {
    void isSupported()
        .then((supported) => {
            if (supported) {
                analytics = getAnalytics(app);
            }
        })
        .catch(() => {
            analytics = null;
        });
}

export { app, analytics };
