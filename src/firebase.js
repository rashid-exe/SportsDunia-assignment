
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXw-7f9-A7tP5-8F1qzZYOVL5HONNo1SU",
  authDomain: "sportsdunia-32124.firebaseapp.com",
  projectId: "sportsdunia-32124",
  appId: "1:408262861828:web:87bcdac65e39a0e19e0151"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
