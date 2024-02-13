import { forwardRef, useImperativeHandle, useRef } from "react"; //to forward the ref to the dialog, otherwise it won't work and give error
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onReset}, ref){
    const dialog = useRef(); //we add this another ref in order to be accessable by all components outside
    const userLost = remainingTime <= 0;
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
    const formattedTime = (remainingTime/1000).toFixed(2)
    useImperativeHandle(ref, ()=>{
        return {
            open(){ //the name of the function is up to you
                dialog.current.showModal();//standart browser feature showModal doesn't come from React. It is to show up the Modal and blur the backgroud
            }
        };
    });
    //it should not be rendered in the place where you are using it in the app but somewhere else
    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}> {/* onClose is added in order to make sure that onReset is triggered when the user press Esc key to close the dialog */}
        {userLost ? (<h2>You lost</h2>) : (<h2>You're score: {score}</h2>)}
        <p>The target time was <strong>{targetTime} seconds.</strong></p>
        <p>You stopped the timer with <strong>{formattedTime} seconds left.</strong></p>
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
        </dialog>,
        document.getElementById('modal')
    )
})

export default ResultModal;