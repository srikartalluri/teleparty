import { useEffect, useRef, useState } from "react";
import { db } from "./firebase";
import { ref, set, onValue } from "firebase/database";

export default function VideoPlayer() {
    const videoRef = useRef(null);
    const [videoUrl, setVideoUrl] = useState(null);

    useEffect(() => {
        async function fetchUrl() {
            const res = await fetch("https://teleparty-backend-776935957980.us-west1.run.app/video-url");
            const data = await res.json();
            setVideoUrl(data.url);
            console.log(data.url);
        }
        fetchUrl();
    }, []);


    useEffect(() => {
        if (!videoUrl) return;
        const playStateRef = ref(db, "room/playState");

        const unsubscribe = onValue(playStateRef, (snapshot) => {
            const state = snapshot.val();
            if (!state) return;

            const video = videoRef.current;
            if (!video) return;

            const { isPlaying, timestamp } = state;

            // If our time differs too much, adjust
            if (Math.abs(video.currentTime - timestamp) > 0.5) {
                video.currentTime = timestamp;
            }

            // Sync play/pause
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
