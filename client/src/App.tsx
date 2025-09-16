import { useState, useEffect } from "react";
import Game from "./Game";
import "@fontsource/inter";

function App() {
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    setShowGame(true);
  }, []);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'relative', 
      overflow: 'hidden',
      backgroundColor: '#87CEEB'
    }}>
      {showGame && <Game />}
    </div>
  );
}

export default App;