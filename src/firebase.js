import Firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAz3N-tQBr6W4jiGUv_FNOa3rjBkClxu9Y',
  authDomain: 'acdmy-b01f5.firebaseapp.com',
  databaseURL: 'https://acdmy-b01f5.firebaseio.com'
}

const firebaseApp = Firebase.initializeApp(config)
const db = firebaseApp.database()

export default db
