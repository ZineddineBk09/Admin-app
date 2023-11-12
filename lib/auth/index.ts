import { auth } from '@/firebase/clientApp'
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { createUser } from '@/utils'

export const signIn = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password).then(
      (res) => res
    )

    return res
  } catch (error) {
    console.log('signIn error: ', error)
    throw new Error(error as any)
  }
}

export const signUp = async ({
  username,
  email,
  password,
  storeName,
  storeAddress,
  storeManager,
  storePhone,
  status,
}: {
  username: string
  email: string
  password: string
  storeName: string
  storeAddress: string
  storeManager: string
  storePhone: string
  status: boolean
}) => {
  try {
    // add user to users collection then register it to firebase auth

    const res = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then(async (res) => {
      await createUser({
        uid: res.user.uid,
        email,
        username,
        storeName,
        storeAddress,
        storeManager,
        storePhone,
        status,
      })
      return res
    })

    return res
  } catch (error) {
    console.log('signUp error: ', error)
    throw new Error(error as any)
  }
}

export const signOutUser = async () => {
  try {
    const res = await signOut(auth)

    return res
  } catch (error) {
    console.log('signOut error: ', error)
    throw new Error(error as any)
  }
}
