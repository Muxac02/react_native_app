import { useEffect, useState } from 'react';

const useCountdown = (targetDate, serverCurrentDate, realDate) => {
  const countDownDate = new Date(targetDate).getTime();
  const currentDate = new Date(serverCurrentDate).getTime();
  const shouldUpdate = realDate == 'null' ? true : false

  const [countDown, setCountDown] = useState(
    countDownDate - currentDate
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (shouldUpdate)
        setCountDown(countDownDate - currentDate)
      else
        setCountDown(new Date(realDate).getTime() - new Date(targetDate).getTime())
        clearInterval(interval)
    }, 5000);

    return () => clearInterval(interval);
  }, [countDownDate, currentDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
    const days = (Math.floor(Math.abs(countDown) / (1000 * 60 * 60 * 24)))
    const hours = (Math.floor(Math.abs(countDown) % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
    const minutes = (Math.floor((Math.abs(countDown) % (1000 * 60 * 60)) / (1000 * 60)))

  return [days, hours, minutes];
};

export { useCountdown };
