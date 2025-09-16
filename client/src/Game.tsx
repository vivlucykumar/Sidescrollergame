import { useEffect, useRef } from "react";
import GameCanvas from "./components/GameCanvas";
import { GameEngine } from "./game/GameEngine";

export default function Game() {
  const gameEngineRef = useRef<GameEngine | null>(null);

  useEffect(() => {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    if (canvas) {
      gameEngineRef.current = new GameEngine(canvas);
      gameEngineRef.current.start();
    }

    return () => {
      if (gameEngineRef.current) {
        gameEngineRef.current.stop();
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <GameCanvas />
      
      {/* Touch Controls for Mobile */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        right: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pointerEvents: 'none'
      }}>
        <div style={{ display: 'flex', gap: '10px', pointerEvents: 'auto' }}>
          <button
            onTouchStart={() => gameEngineRef.current?.inputManager.setKey('ArrowLeft', true)}
            onTouchEnd={() => gameEngineRef.current?.inputManager.setKey('ArrowLeft', false)}
            onMouseDown={() => gameEngineRef.current?.inputManager.setKey('ArrowLeft', true)}
            onMouseUp={() => gameEngineRef.current?.inputManager.setKey('ArrowLeft', false)}
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'rgba(0,0,0,0.5)',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              fontSize: '20px',
              userSelect: 'none'
            }}
          >
            ←
          </button>
          <button
            onTouchStart={() => gameEngineRef.current?.inputManager.setKey('ArrowRight', true)}
            onTouchEnd={() => gameEngineRef.current?.inputManager.setKey('ArrowRight', false)}
            onMouseDown={() => gameEngineRef.current?.inputManager.setKey('ArrowRight', true)}
            onMouseUp={() => gameEngineRef.current?.inputManager.setKey('ArrowRight', false)}
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'rgba(0,0,0,0.5)',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              fontSize: '20px',
              userSelect: 'none'
            }}
          >
            →
          </button>
        </div>
        
        <button
          onTouchStart={() => gameEngineRef.current?.inputManager.setKey('Space', true)}
          onTouchEnd={() => gameEngineRef.current?.inputManager.setKey('Space', false)}
          onMouseDown={() => gameEngineRef.current?.inputManager.setKey('Space', true)}
          onMouseUp={() => gameEngineRef.current?.inputManager.setKey('Space', false)}
          style={{
            width: '80px',
            height: '60px',
            backgroundColor: 'rgba(255,0,0,0.7)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            userSelect: 'none',
            pointerEvents: 'auto'
          }}
        >
          JUMP
        </button>
      </div>

      {/* Game UI Overlay */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        pointerEvents: 'none'
      }}>
        <div>Score: <span id="score">0</span></div>
        <div>Lives: <span id="lives">3</span></div>
      </div>

      {/* Game Over Screen */}
      <div 
        id="gameOverScreen" 
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'none',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '24px',
          textAlign: 'center'
        }}
      >
        <h2>Game Over!</h2>
        <p>Final Score: <span id="finalScore">0</span></p>
        <button
          onClick={() => gameEngineRef.current?.restart()}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}