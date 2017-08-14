import Firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAz3N-tQBr6W4jiGUv_FNOa3rjBkClxu9Y',
  authDomain: 'acdmy-b01f5.firebaseapp.com',
  databaseURL: 'https://acdmy-b01f5.firebaseio.com',
  projectId: 'acdmy-b01f5',
  storageBucket: 'acdmy-b01f5.appspot.com'
}

const firebaseApp = Firebase.initializeApp(config)
export const db = firebaseApp.database()
const storage = firebaseApp.storage()

export const storageRef = storage.ref()

export const usersRef = db.ref('users')
export const roomsRef = db.ref('rooms')
export const peopleRef = db.ref('people')
