import { forwardRef, useImperativeHandle, useRef } from "react"; //to forward the ref to the dialog, otherwise it won't work and give error
const ResultModal = forwardRef(function ResultModal({result, targetTime}, ref){
    const dialog = useRef(); //we add this another ref in order to be accessable by all components outside
    useImperativeHandle(ref, ()=>{
        return {
            open(){ //the name of the function is up to you
                dialog.current.showModal();//standart browser feature showModal doesn't come from React. It is to show up the Modal and blur the backgroud
            }
        };
    });
    return(
        <dialog ref={dialog} className="result-modal">
        <h2>You {result}</h2>
        <p>The target time was <strong>{targetTime} seconds.</strong></p>
        <p>You stopped the timer with <strong>X seconds left.</strong></p>
        <form method="dialog">
            <button>Close</button>
        </form>
        </dialog>
    )
})

export default ResultModal;