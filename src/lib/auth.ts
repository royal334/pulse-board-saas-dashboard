import { createUserWithEmailAndPassword ,signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export async function registerUser(name: string,email: string, password: string) {
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "users", userCred.user.uid), {
      name,
      email,
      role: "user",
      createdAt: new Date(),
    });

    return userCred.user;
  } catch (error: any) {
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    return userCred.user;
  } catch (error: any) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw error;
  }
}
