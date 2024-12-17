import { useEffect, useRef, useState } from 'react';
import './Timer.css'

// stop watch timer with hours
const Timer = () => {
    const [{hours, minutes, seconds}, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const intervalRef = useRef<any>({ id: null });

    const handleIncrement = () => {
        setTime((prevState) => {
            let newSeconds = prevState.seconds + 1;
            let newMinutes = prevState.minutes;
            let newHours = prevState.hours;

            // Handle seconds rollover
            if (newSeconds === 60) {
                newSeconds = 0;
                newMinutes += 1;
            }

            // Handle minutes rollover
            if (newMinutes === 60) {
                newMinutes = 0;
                newHours += 1;
            }

            return {
                hours: newHours,
                minutes: newMinutes,
                seconds: newSeconds
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
            hours: 0,
            minutes: 0,
            seconds: 0
        })
    }

    // Helper function to pad single digits with leading zero
    const padTime = (time: number) => time.toString().padStart(2, '0');

    return (
        <div className="timer">
            <div className='actions'>
                <button onClick={handleStartTimer}>Start timer</button>
                <button onClick={handlePauseTimer}>Pause timer</button>
                <button onClick={handleStartTimer}>Resume timer</button>
                <button onClick={handleResetTimer}>Reset timer</button>
            </div>
            <div className='display-timer'>
                {padTime(hours)} : {padTime(minutes)} : {padTime(seconds)}
            </div>
        </div>
    )
}

export default Timer