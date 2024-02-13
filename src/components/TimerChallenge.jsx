import { useState, useRef } from "react";
import ResultModal from "./Modal";
//let timer; //if it is inside it won't work for both handleStart and handleStop. But still is not a solution if i start more than one challenge at the same time
export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();
    const dialog = useRef();
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open(); //useImperativeHandle, Modal file
    }
    function handleReset() {
        setTimeRemaining(targetTime * 1000); //be careful cuz this may cause an endless loop
    }
    const handleStart = () => {
        timer.current = setInterval(() => { //will not execute the function just ones like setTimeout, but every time the time expires
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }
    const handleStop = () => {
        dialog.current.open(); //useImperativeHandle, Modal file
        clearInterval(timer.current);
    }

    return (
        <>
            <ResultModal
                ref={dialog}
                targetTime={targetTime}
                remainingTime={timeRemaining}
                onReset={handleReset} />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? 'Stop' : 'Start'} Challenge</button>
                <p className={timerIsActive ? "active" : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}