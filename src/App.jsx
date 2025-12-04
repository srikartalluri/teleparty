import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
// import { auth, provider } from "./firebaseAuth";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { db, auth, googleProvider} from "./firebaseClient";

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("AUTH STATE CHANGED:", user);
        if (!user) setUser(null);
        else setUser(user);
    });

    return () => unsubscribe();
}, []);

    const login = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error("Google login failed:", err);
        }
    };

    // While checking auth state
    // if (user === null) {
    //     return (
    //         <div style={{
    //             background: "#111",
    //             height: "100vh",
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             color: "white",
    //             fontSize: "20px"
    //         }}>
    //             Loading...
    //         </div>
    //     );
    // }

    // User not logged in → show a single login button
    if (!user) {
        return (
            <div style={{
                background: "#111",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <button
                    onClick={login}
                    style={{
                        padding: "12px 20px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    Sign in with Google
                </button>
            </div>
        );
    }

    // User logged in → show your video player
    return (
        <div style={{
            background: "#111",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <VideoPlayer user={user} />
        </div>
    );
}
