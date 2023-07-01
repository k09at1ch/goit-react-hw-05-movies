import { Link, useLocation } from "react-router-dom";
import style from './Header.module.css';

function Header() {
  const location = useLocation();

  return (
    <div className={style.containerHeader}>
      <Link
        to="/"
        className={`${style.link} ${location.pathname === '/' ? style.active : ''}`}
      >
        Home
      </Link>
      <Link
        to="/moviefinder"
        className={`${style.link} ${location.pathname === '/moviefinder' || location.pathname.startsWith('/movies') ? style.active : ''}`}
      >
        Movies
      </Link>
    </div>
  );
}

export default Header;
