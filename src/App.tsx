import { useState } from 'react'
import './App.css'
import Timer from './Timer';

function App() {
  const [timers, setTimers] = useState<any[]>([]);

  const handleAddTimer = () => {
    const id = Date.now();
    setTimers([...timers, { id }]);
  }

  return (
    <div>
      <button onClick={handleAddTimer}>Add timer</button>
      <div>
        {timers.map((timer) => (
          <div key={timer.id}>
            <Timer />
          </div>
        ))}
        </div>
    </div>
  )
}

export default App
