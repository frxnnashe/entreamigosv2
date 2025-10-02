// Configuración modular Firebase v9+
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB0OcEMasaPdEX8T6lzHG5kEcMDmOgCPXs",
  authDomain: "entreamigosv2.firebaseapp.com",
  projectId: "entreamigosv2",
  storageBucket: "entreamigosv2.firebasestorage.app",
  messagingSenderId: "546137018103",
  appId: "1:546137018103:web:4bb955e7013fda24d88df2"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)