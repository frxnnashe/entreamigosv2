import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '../config/firebase'

const productsCol = collection(db, 'products')

export const fetchProducts = async () => {
  const snap = await getDocs(productsCol)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export const createProduct = async ({ name, desc, price }, file) => {
  const storageRef = ref(storage, `products/${file.name}`)
  const snap = await uploadBytes(storageRef, file)
  const url = await getDownloadURL(snap.ref)

  await addDoc(productsCol, {
    name,
    desc,
    price: Number(price),
    imageUrl: url,
    createdAt: serverTimestamp(),
  })
}

export const deleteProduct = async (id, imageUrl) => {
  await deleteDoc(doc(db, 'products', id))
  if (imageUrl) {
    const imgRef = ref(storage, imageUrl)
    await deleteObject(imgRef).catch(() => {}) // ignora si ya fue borrada
  }
}