
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDC_j0JpxRcrN760J4tYfNyADfTTqmQqCY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "sanraksha-df698",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
