import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "./firebase_config";

export async function loginUser(email: string, password: string) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error('Error al iniciar sesión:', error.message);
    return false;
  }
}
