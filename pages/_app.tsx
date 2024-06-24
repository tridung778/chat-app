import type { AppProps } from "next/app";
import Login from "./login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function App({ Component, pageProps }: AppProps) {
  const [loggedUser, loading, _error] = useAuthState(auth);

  useEffect(() => {
    const setUserInDb = async () => {
      try {
        await setDoc(
          doc(db, "users", loggedUser?.email as string),
          {
            email: loggedUser?.email,
            lastSeen: serverTimestamp(),
            photoUrl: loggedUser?.photoURL,
          },
          {
            merge: true,
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (loggedUser) {
      setUserInDb();
    }
  },[loggedUser]);

  if (loading) {
    return <Loading />;
  }

  if (!loggedUser) {
    return <Login />;
  }

  return <Component {...pageProps} />;
}
