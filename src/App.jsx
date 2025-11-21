import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import VideoPlayer from "./VideoPlayer";

function App() {
  return (
    <div style={{ background: "#111", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <VideoPlayer />
    </div>
  );
}

export default App;
