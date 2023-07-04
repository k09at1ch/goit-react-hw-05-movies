import { useNavigate } from "react-router"
import style from './notFound.module.css'
function NotFound(){
    const navigate = useNavigate()
    function goHome(){
        navigate('/', {replace: true})
    }
    return(
        <div className={style.div}>
            <p className={style.text}>404 NOT FOUND</p>
            <button onClick={goHome} className={style.button}>Go home</button>
        </div>
    )
}
export default NotFound