import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import style from './notFound.module.css';

function NotFound() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      navigate('/', { replace: true });
    }, seconds * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={style.div}>
      <p className={style.text}>404 NOT FOUND</p>
      <p className={style.text}>Returning home in {seconds} seconds</p>
    </div>
  );
}

export default NotFound;
