// Firebase web configuration. These values identify your Firebase project; they are not admin passwords.
// Replace every placeholder with the values from Firebase Console > Project settings > Your apps.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'PASTE_API_KEY_HERE',
  authDomain: 'PASTE_PROJECT_ID_HERE.firebaseapp.com',
  projectId: 'PASTE_PROJECT_ID_HERE',
  storageBucket: 'PASTE_PROJECT_ID_HERE.appspot.com',
  messagingSenderId: 'PASTE_MESSAGING_SENDER_ID_HERE',
  appId: 'PASTE_APP_ID_HERE'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const firebaseIsConfigured = !Object.values(firebaseConfig).some(v => String(v).includes('PASTE_'));
