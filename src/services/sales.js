import { db } from '../config/firebase'
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'

const salesCol = collection(db, 'sales')

/* ======  LEER  ====== */
export const fetchSales = async () => {
  const q = query(salesCol, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/* ======  FILTRAR POR FECHA  ====== */
export const fetchSalesByRange = async (start, end) => {
  const q = query(
    salesCol,
    where('createdAt', '>=', start),
    where('createdAt', '<=', end),
    orderBy('createdAt', 'desc'),
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/* ======  BORRAR  ====== */
export const deleteSale = async (id) => await deleteDoc(doc(db, 'sales', id))

/* ======  EDITAR  ====== */
export const updateSale = async (id, data) =>
  await updateDoc(doc(db, 'sales', id), { ...data, updatedAt: serverTimestamp() })



export const createSale = async (items, total) => {
  await addDoc(salesCol, {
    items,
    total,
    createdAt: serverTimestamp(),
  })
}
