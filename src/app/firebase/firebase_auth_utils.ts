import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "./firebase_config";

const db = getFirestore();

export async function loginUser(email: string, password: string) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error('Error al iniciar sesión:', error.message);
    return false;
  }
}

export async function registerUser(email: string, password: string) {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error('Error al registrar usuario:', error.message);
    throw error;
  }
}

export async function saveUserProfile(userId: string, userData: any) {
  try {
    await setDoc(doc(db, "Users", userId), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error: any) {
    console.error('Error al guardar el perfil del usuario:', error.message);
    throw error;
  }
}
