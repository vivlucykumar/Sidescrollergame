export default function GameCanvas() {
  return (
    <canvas
      id="gameCanvas"
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        imageRendering: 'pixelated',
        backgroundColor: '#87CEEB'
      }}
    />
  );
}