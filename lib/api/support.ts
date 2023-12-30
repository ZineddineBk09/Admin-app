import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import { firestore, storage } from '@/firebase/support'
import { ChatMessage } from '@/interfaces'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const addMessage = async (chatId: string, message: any) => {
  try {
    const docRef = doc(firestore, 'chats', chatId)
    await addDoc(collection(docRef, 'messages'), {
      ...message,
      timestamp: new Date(),
    })
    await updateDoc(docRef, {
      lastUpdate: new Date(),
    })

    return true
  } catch (e) {
    console.log(e)
  }
}

export const uploadFile = async (
  file: File,
  chatId: string,
  senderId: string
) => {
  if (!file) throw new Error('No file provided')
  if (!chatId) throw new Error('No chatId provided')
  if (!senderId) throw new Error('No senderId provided')

  const storageRef = ref(
    storage,
    `chat-files/${chatId}/messages/support/${file.name}`
  )

  // Upload file to Firebase Storage
  await uploadBytes(storageRef, file)

  // Get the download URL of the uploaded file
  const fileURL = await getDownloadURL(storageRef)

  // Update Firestore message with file URL
  const docRef = doc(firestore, 'chats', chatId)
  await addDoc(collection(docRef, 'messages'), {
    senderId,
    content: fileURL,
    timestamp: new Date(),
    type: 'support',
    fileURL, // Include the file URL in the Firestore document
  })

  // Update the lastUpdate field in the chat document
  await updateDoc(docRef, {
    lastUpdate: new Date(),
  })

  return fileURL
}

// create uploadFiles function that accepts an array of files and uploads them all one by one to firebase storage using the uploadFile function
export const uploadFiles = async (
  files: File[],
  chatId: string,
  senderId: string
) => {
  // loop through files array and upload each file to firebase storage
  const filesURLs: string[] = []
  for (const file of files) {
    const fileURL = await uploadFile(file, chatId, senderId)
    filesURLs.push(fileURL)
  }
  return filesURLs
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
    collection(firestore, 'chats', chatId, 'messages'),
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
  const q = query(collection(firestore, 'chats'), orderBy('lastUpdate', 'asc'))
  const querySnapshot = await getDocs(q)
  const chats: any[] = []
  querySnapshot.forEach(async (doc) => {
    chats.push({ ...doc.data(), id: doc.id })
  })
  return chats
}

export const createChat = async (chat: any, messages: any[]) => {
  const chatRef = await addDoc(collection(firestore, 'chats'), {
    ...chat,
    lastUpdate: new Date(),
  }).then((docRef) => {
    // add messages to the chat ==> subcollection
    messages.forEach(async (message) => {
      await addDoc(collection(docRef, 'messages'), {
        ...message,
        timestamp: new Date(),
      })
    })
    return docRef
  })

  return chatRef.id
}
