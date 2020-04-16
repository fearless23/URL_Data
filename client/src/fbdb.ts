// Your web app's Firebase configuration
import { firestore, initializeApp, analytics } from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAaLfyQSlUZsHFY7K5CoGUwSenR1o-m-UA",
  authDomain: "url-data-2412.firebaseapp.com",
  databaseURL: "https://url-data-2412.firebaseio.com",
  projectId: "url-data-2412",
  storageBucket: "url-data-2412.appspot.com",
  messagingSenderId: "74940418459",
  appId: "1:74940418459:web:0644d9d1ae7d5a77a0793e",
  measurementId: "G-PED5NZW0QK",
};

const app = initializeApp(firebaseConfig);
analytics(app);

const urlsColl = firestore().collection("urls");

export { urlsColl };
