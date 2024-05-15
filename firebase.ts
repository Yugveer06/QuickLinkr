import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD5nUfenX5FSDlq3tXvaTyNL-m4GMxUuRw",
    authDomain: "quicklinkr-63b5e.firebaseapp.com",
    projectId: "quicklinkr-63b5e",
    storageBucket: "quicklinkr-63b5e.appspot.com",
    messagingSenderId: "1080392354605",
    appId: "1:1080392354605:web:3b83b0246cba72def7e1a4",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
