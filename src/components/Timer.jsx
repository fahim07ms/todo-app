import { useState, useEffect } from "react";

function Timer({ deadline }) {
    
    // UseStates
    const [remainingTime, setRemainingTime] = useState("");

    // Get the formatted Time
    const getRemainingTime = (time) => {
        if (time > 0) {
            const d = time.getDate() - 1;
            const h = time.getHours();
            const m = time.getMinutes();
            const s = time.getSeconds();

            return `${d}d ${h}h ${m}m ${s}s`;
        } else {
            return `0d 0h 0m 0s`;
        }

    };

    let timeDif = 0;
    useEffect(() => {
        let timeInterval = null;

        timeInterval = setInterval(() => {
            timeDif = new Date(deadline)  - new Date();
            setRemainingTime(getRemainingTime(new Date(timeDif)));
        });

        return () => {
            if (timeInterval) {
                clearInterval(timeInterval);
            }
        }
    }, [deadline, timeDif]);
    
    return (
        <div className="timer">
            {remainingTime}
        </div>
    );
}

export default Timer;