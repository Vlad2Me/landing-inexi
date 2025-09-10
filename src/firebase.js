import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCBZ-RuL2YRSaK40N2foeRYdxyUoWt8MY",
  authDomain: "inexilanding.firebaseapp.com",
  projectId: "inexilanding",
  storageBucket: "inexilanding.firebasestorage.app",
  messagingSenderId: "591487912979",
  appId: "1:591487912979:web:288eff5ebb7fd9059ec3e6",
  measurementId: "G-W0YC0PV6KS"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore(app)

// Add a waitlist submission document
export const addWaitlistSubmission = async (email, saasDescription) => {
  try {
    const docRef = await addDoc(collection(db, 'waitlist'), {
      email,
      saasDescription,
      status: 'pending',
      createdAt: serverTimestamp(),
    })
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error('Error adding document: ', error)
    return { success: false, error: error.message }
  }
}

export { db }

