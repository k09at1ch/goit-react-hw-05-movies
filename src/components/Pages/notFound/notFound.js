import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import style from './notFound.module.css';

function NotFound() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(3);
  useEffect(() => {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 1500);
  }, [navigate, seconds]);

  return (
    <div className={style.div}>
      <p className={style.text}>404 NOT FOUND</p>
    </div>
  );
}

export default NotFound;
