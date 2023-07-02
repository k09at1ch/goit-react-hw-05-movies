import { Link, useLocation } from "react-router-dom";
import style from './Header.module.css'; 
 export let selected='home'
 function handleChoosingMovieFinder(){
    selected='moviefinder'
    console.log(selected)
    return selected
  }
  function handleChoosingHome(){
    selected='home'
    console.log(selected)
    return selected
  }


function Header() {

  
  
  const location = useLocation();

  return (
    <div className={style.containerHeader}>
      <Link
      onClick={handleChoosingHome}
        to="/"
        className={`${style.link} ${location.pathname === '/' || location.pathname.startsWith('/movies/') ? style.active : ''}`}

      >
        Home
      </Link>
      <Link
      onClick={handleChoosingMovieFinder}
        to="/moviefinder"
        className={`${style.link} ${location.pathname === '/moviefinder' || location.pathname.startsWith('/moviefinder/') ? style.active : ''}`}
      >
        Movies
      </Link>
    </div>
  );
}

export default Header;