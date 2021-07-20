import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}
try {
    firebase.initializeApp(firebaseConfig)
}
catch (error) {
    console.log(error.message)
}

// ステート初期値
const initial = {
  login: false,
  user_name: '',
  email: '',
}

// レデューサー
function counterReducer (state = initial, action) {
  switch (action.type) {
    case 'UpdateUser':
        return {
            login: action.value.login,
            user_name: action.value.user_name,
            email: action.value.email,
        }
    default:
      return state;
  }
}


// initStore関数（redux-store.jsで必要）
export function initStore(state = initial) {
  return createStore(counterReducer, state,
    applyMiddleware(thunkMiddleware))
}