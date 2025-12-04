import { useEffect, useRef, useState } from "react";
// import { db } from "./firebase";
import { ref, set, onValue } from "firebase/database";
import { db, auth, googleProvider} from "./firebaseClient";

export default function VideoPlayer({ user }) {
    const videoRef = useRef(null);
    const [videoUrl, setVideoUrl] = useState(null);

    useEffect(() => {
        async function fetchUrl() {
            const idToken = await user.getIdToken();

            const res = await fetch(
                "https://teleparty-backend-776935957980.us-west1.run.app/video-url",
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`
                    }
                }
            );

            const data = await res.json();
            setVideoUrl(data.url);   // signed URL
            console.log("Signed URL:", data.url);
        }
        fetchUrl();
    }, [user]);

    useEffect(() => {
        if (!videoUrl) return;

        const playStateRef = ref(db, "room/playState");

        const unsubscribe = onValue(playStateRef, (snapshot) => {
            const state = snapshot.val();
            if (!state) return;

            const video = videoRef.current;
            if (!video) return;

            const { isPlaying, timestamp } = state;

            if (Math.abs(video.currentTime - timestamp) > 0.5) {
                video.currentTime = timestamp;
            }

            if (isPlaying) video.play();
            else video.pause();
        });

        return () => unsubscribe();
    }, [videoUrl]);

    const broadcast = (isPlaying) => {
        const video = videoRef.current;
        set(ref(db, "room/playState"), {
            isPlaying,
            timestamp: video.currentTime,
            lastUpdate: Date.now()
        });
    };

    return (
        <video
            ref={videoRef}
            src={videoUrl}
            controls
            style={{ width: "95%" }}
            onPlay={() => broadcast(true)}
            onPause={() => broadcast(false)}
            onSeeked={() => broadcast(!videoRef.current.paused)}
        />
    );
}
