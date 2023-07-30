import { useEffect, useState } from "react";

const CountdownTimer = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "-",
    hours: "-",
    minutes: "-",
    seconds: "-",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({
          days: "0",
          hours: "0",
          minutes: "0",
          seconds: "0",
        });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [endDate]);

  return (
    <div className="timeLeft">
      <div className="time-col">
        <span>{timeLeft.days}</span>
        <p>Days</p>
      </div>
      <div className="time-col">
        <span>{timeLeft.hours}</span>
        <p>Hours</p>
      </div>
      <div className="time-col">
        <span>{timeLeft.minutes}</span>
        <p>Minutes</p>
      </div>
      <div className="time-col">
        <span>{timeLeft.seconds}</span>
        <p>Seconds</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
