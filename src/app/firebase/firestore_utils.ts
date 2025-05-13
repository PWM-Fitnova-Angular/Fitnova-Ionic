
import {collection, getDocs, addDoc} from 'firebase/firestore';
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
