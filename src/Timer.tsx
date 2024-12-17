import { useEffect, useRef, useState } from 'react';
import './Timer.css'

// stop watch timer
const Timer = () => {
    
    const [{minutes, seconds}, setTime] = useState<any>({
        minutes: 0,
        seconds: 0
    });

    const intervalRef = useRef<any>({ id: null });

    const handleIncrement = () => {
        setTime((prevState: any) => {
            const updatedSeconds = prevState.seconds + 1;
            if(updatedSeconds === 10){
                return {
                    minutes: prevState.minutes + 1,
                    seconds: 0
                }
            }
            return {
                ...prevState,
                seconds: updatedSeconds
            }
        })
    }

    const handleStartTimer = () => {
        if(!intervalRef.current.id){
            intervalRef.current.id = setInterval(handleIncrement, 1000);
        }
    }

    useEffect(() => {
        handleStartTimer();
    }, [])

    const handlePauseTimer = () => {
        clearInterval(intervalRef.current.id);
        intervalRef.current.id = null;
    }

    const handleResetTimer = () => {
        clearInterval(intervalRef.current.id);
        intervalRef.current.id = null;
        setTime({
            minutes: 0,
            seconds: 0
        })
    }

    return (
        <div className="timer">
            <div className='actions'>
                <button onClick={handleStartTimer}>Start timer</button>
                <button onClick={handlePauseTimer}>Pause timer</button>
                <button onClick={handleStartTimer}>Resume timer</button>
                <button onClick={handleResetTimer}>Reset timer</button>
            </div>
            <div className='display-timer'>
                {minutes} : {seconds}
            </div>
        </div>
    )
}

export default Timer