import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
  deleteDoc,
} from 'firebase/firestore'
import { firestore, storage, app } from '@/firebase/support'
import { ChatMessage } from '@/interfaces'
import { ref, uploadBytes } from 'firebase/storage'

export const addMessage = async (message: ChatMessage) => {
  const docRef = await addDoc(collection(firestore, 'messages'), {
    ...message,
    timestamp: new Date(),
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

export const deleteChatMessage = async (id: string) => {
  const docRef = doc(firestore, 'messages', id)
  await deleteDoc(docRef)
}

export const updateChatMessage = async (message: ChatMessage) => {
  const docRef = doc(firestore, 'messages', message.id)
  await updateDoc(docRef, {
    ...message,
    lastUpdate: new Date(),
  })
}

export const fetchChatMessages = async (chatId: string) => {
  const q = query(
    collection(firestore, 'messages'),
    where('chatId', '==', chatId),
    orderBy('timestamp', 'asc')
  )
  const querySnapshot = await getDocs(q)
  const messages: any[] = []
  querySnapshot.forEach(async (doc) => {
    messages.push({ ...doc.data(), id: doc.id })
  })
  return messages
}

export const fetchChats = async () => {
  const q = query(collection(firestore, 'chats'), orderBy('lastUpdate', 'desc'))
  const querySnapshot = await getDocs(q)
  const chats: any[] = []
  querySnapshot.forEach(async (doc) => {
    chats.push({ ...doc.data(), id: doc.id })
  })
  return chats
}