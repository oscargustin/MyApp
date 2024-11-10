import { initializeApp } from "firebase/app";


export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAuAoGlaNr6H2f97GET8aUqbtKOPDLHoRY",
    authDomain: "registrapp-956eb.firebaseapp.com",
    projectId: "registrapp-956eb",
    storageBucket: "registrapp-956eb.firebasestorage.app",
    messagingSenderId: "818370064666",
    appId: "1:818370064666:web:9193722d76446ed0407ca3",
    measurementId: "G-2W0QJMYDMN"
  }
};

const app = initializeApp(environment.firebaseConfig);

