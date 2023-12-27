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
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const addMessage = async (message: any) => {
  const docRef = await addDoc(collection(firestore, 'messages'), {
    ...message,
    timestamp: new Date(),
  }).then((docRef) => {
    return docRef
  })
  return docRef.id
}

export const uploadFile = async (
  file: File,
  chatId: string,
  senderId: string
) => {
  if (!file) throw new Error('No file provided')
  if (!chatId) throw new Error('No chatId provided')
  if (!senderId) throw new Error('No senderId provided')
  
  const storageRef = ref(storage, `chats/${chatId}/files/${file.name}`)

  // Upload file to Firebase Storage
  await uploadBytes(storageRef, file)

  // Get the download URL of the uploaded file
  const fileURL = await getDownloadURL(storageRef)

  // Update Firestore message with file URL
  // Example: firestore.collection('messages').doc(messageId).update({ content: fileURL });
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
