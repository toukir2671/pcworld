import { useEffect, useRef, useState } from "react";

const useCountdown = (endDate) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "-",
    hours: "-",
    minutes: "-",
    seconds: "-",
  });

  const intervalRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance <= 0) {
        clearInterval(intervalRef.current);
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

    // Store the interval ID in the ref
    intervalRef.current = interval;

    return () => {
      clearInterval(interval);
    };
  }, [endDate]);

  return timeLeft;
};

export default useCountdown;
