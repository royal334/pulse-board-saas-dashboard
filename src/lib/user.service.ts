import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import {
  updateProfile,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";


export interface UserProfile {
  name: string;
  email: string;
  role?: string;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    } else {
      console.warn("No user profile found in Firestore.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

export async function updateUserProfile(uid: string, data: { name: string }) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user founded.");

    // 1. Update Auth Profile
    await updateProfile(user, {
      displayName: data.name,
    });

    // 2. Update Firestore Document
    const docRef = doc(db, "users", uid);
    await setDoc(
      docRef,
      {
        name: data.name,
        email: user.email,
      },
      { merge: true },
    );

    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

export async function triggerPasswordReset(email: string) {
  try {
    console.log("Attempting to send password reset email to:", email);
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}

export async function deleteUserAccount() {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user found.");

    const uid = user.uid;

    // 1. Delete Firestore Document
    await deleteDoc(doc(db, "users", uid));

    // 2. Delete Auth User
    // Note: This requires recent authentication. If failed, we might need to prompt re-login.
    await deleteUser(user);

    return true;
  } catch (error) {
    console.error("Error deleting user account:", error);
    throw error;
  }
}
