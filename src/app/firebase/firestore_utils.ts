import {collection, getDocs, getDoc, doc} from 'firebase/firestore';
import {db} from './firebase_config';


export async function getWebData() {

  return getAllDocumentsFromCollection("Fitnova");

}
export async function getAllDocumentsFromCollection(collectionName:string): Promise<any> {
  try {
    const colRef = collection(db, collectionName);
    const colSnap = await getDocs(colRef);

    const docs:any = [];
    colSnap.forEach(doc => {
      docs.push({id:doc.id, ...doc.data()});
    });
    return docs;
  }catch (error) {
    console.error("Error getAllDocumentsFromCollection:", error);
  }
}

export async function getUserData(): Promise<any> {
  const uid = localStorage.getItem("uid");

  if (!uid) {
    console.error("No UID found in session storage.");
    return null;
  }
  const userRef = doc(db, "Users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  }
  else{
    console.error("User data not found");
  }
}
