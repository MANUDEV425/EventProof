import app from "./firebaseConfig";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    return result.user;
  } catch (error) {
    console.error(error);
  }
};