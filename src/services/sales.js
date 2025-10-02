import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

const salesCol = collection(db, 'sales')

export const createSale = async (items, total) => {
  await addDoc(salesCol, {
    items,
    total,
    createdAt: serverTimestamp(),
  })
}

export const fetchSales = async () => {
  const snap = await getDocs(salesCol)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}