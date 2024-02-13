import { useState, useRef } from "react";
import ResultModal from "./Modal";
//let timer; //if it is inside it won't work for both handleStart and handleStop. But still is not a solution if i start more than one challenge at the same time
export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();
    const [timerExpired, setTimerExpired] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const handleStart = () => {
        timer.current = setTimeout(() => { 
            setTimerExpired(true)
            dialog.current.open(); //useImperativeHandle, Modal file
        }, targetTime * 1000);
        setTimerStarted(true);//after the timer is set, cuz if it will be put inside setTimeout it will be executed after the time has expired
    }
    const handleStop = () => {
        clearTimeout(timer.current);
    }
    const dialog = useRef();
    return (
        <>
        <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second {targetTime > 1 ? 's' : ''}
            </p>
            <button onClick={timerStarted ? handleStop : handleStart}>{timerStarted ? 'Stop' : 'Start'} Challenge</button>
            <p className={timerStarted ? "active" : undefined}>
                {timerStarted ? 'Time is running...' : 'Timer inactive'}
            </p>
        </section>
        </>
    )
}