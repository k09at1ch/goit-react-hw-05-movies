import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import style from './notFound.module.css';

function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 1500);
  }, [navigate]);

  return (
    <div className={style.div}>
      <p className={style.text}>404 NOT FOUND</p>
    </div>
  );
}

export default NotFound;
