import { doc, collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase';  // Import the Firestore instance

const circlesCollection = collection(db, "Circles")

async function createCircle(circlename, goal) {
  if (!circlename || !goal) {
    console.error("Circle name and goal are required.");
    return;
  }

  try {
    const docRef = await addDoc(circlesCollection, {
      name: circlename,
      goal: goal,
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


async function getAllCircles() {
  try {
    // Reference to the collection
    const querySnapshot = await getDocs(circlesCollection);

    // Create an array to hold the document data
    const documents = [];
    
    // Iterate through each document in the collection
    querySnapshot.forEach((doc) => {
      // Push document data and ID into the documents array
      documents.push({ id: doc.id, ...doc.data() });
    });

    // Return or log the retrieved documents
    console.log("Retrieved documents: ", documents);
    return documents;
  } catch (e) {
    console.error("Error retrieving documents: ", e);
  }
}
export {createCircle, getAllCircles};
