import {
  addDoc,
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  orderBy,
  query,
  startAt,
  updateDoc,
  where,
  deleteDoc,
} from 'firebase/firestore'
import { firestore, storage, app } from '@/firebase/clientApp'
import { RegisterUser } from '@/interfaces'
import { ref, uploadBytes } from 'firebase/storage'

export const truncateTxt = (str: string, n: number) => {
  return str.length > n ? str.substr(0, n - 1) + '...' : str
}

export const createUser = async (user: RegisterUser) => {
  const docRef = await addDoc(collection(firestore, 'accounts'), user).then(
    (docRef) => {
      return docRef
    }
  )
  return docRef
}

export const addPlate = async (plate: any) => {
  const docRef = await addDoc(collection(firestore, 'plates'), {
    ...plate,
    date: new Date(),
    lastUpdate: new Date(),
  }).then((docRef) => {
    return docRef
  })
  return docRef.id
}

export const uploadImage = async (image: File, id: string) => {
  if (!image) throw new Error('No image provided')
  const storageRef = ref(storage, `plates/${id}`)
  await uploadBytes(storageRef, image)
    .then((snapshot) => {
      console.log('Uploaded a blob or file!')
    })
    .catch((error) => {
      console.log(error)
      throw new Error('Error uploading image')
    })
}

export const deletePlate = async (id: string) => {
  const docRef = doc(firestore, 'plates', id)
  await deleteDoc(docRef)
}

export const updatePlate = async (plate: any) => {
  const docRef = doc(firestore, 'plates', plate.id)
  await updateDoc(docRef, {
    ...plate,
    lastUpdate: new Date(),
  })
}

export const fetchPlates = async () => {
  const q = query(collection(firestore, 'plates'), orderBy('date', 'desc'))
  const querySnapshot = await getDocs(q)
  const plates: any[] = []
  querySnapshot.forEach(async (doc) => {
    // get plate image
    const imageUrl =
      'https://firebasestorage.googleapis.com/v0/b/linko-client.appspot.com/o/plates%2F' +
      doc.id +
      '?alt=media&token=ab79e3b3-6b10-4a11-88c7-ece7cb51f6ce'

    plates.push({ ...doc.data(), id: doc.id, image: imageUrl })
  })
  return plates
}

export const fetchAccount = async (uid: string) => {
  // fetch account data where uid = uid
  const q = query(collection(firestore, 'accounts'), where('uid', '==', uid))
  const querySnapshot = await getDocs(q)
  const accounts: any[] = []
  querySnapshot.docs.forEach(async (doc) => {
    accounts.push({ ...doc.data(), id: doc.id })
  })
  return accounts[0]
}
