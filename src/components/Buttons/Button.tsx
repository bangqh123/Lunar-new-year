import { useNavigate } from "react-router-dom"

type TButtonProps = {
    class: string,
    link: string,
    text: string
}

const Button: React.FC<TButtonProps> = ({ class: className, link, text }) => {
    const navigate = useNavigate()
    return(
        <div className={`button ${className}`} onClick={() => navigate(link)}>
            <span>{text}</span>
        </div>
    )    
}

export default Button