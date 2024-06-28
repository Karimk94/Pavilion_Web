import { auth } from "firebase/app";

export const loginRequest = (email, password) =>
  auth().signInWithEmailAndPassword(email, password);
