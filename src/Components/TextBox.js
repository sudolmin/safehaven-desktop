import { useState } from 'react'
import {FaEye, FaEyeSlash} from 'react-icons/fa'

const TextBox = ({type, placeholder, changefunc, className, id, value, wrapperClassName}) => {

    const [pwdvisistate, setpwdvisistate] = useState(type);

    function toggleVisiblity(){
        if (pwdvisistate==="password") {
            setpwdvisistate("text");
        } else {
            setpwdvisistate("password");
        }
    }

    return (
        <div id={id} className={wrapperClassName}>
            <input type={pwdvisistate} className={className}  placeholder={placeholder} onChange={changefunc} value={value}/>
            {
                type==="password"&&
                <div id="togglevisipass" onClick={toggleVisiblity}>
                    {pwdvisistate==="password"?
                    <FaEye color="#0F4D66"/>:
                        <FaEyeSlash color="#447285"/>
                    }
                </div>
                }
        </div>
    )
}

TextBox.defaultProps = {
    type: "text",
    placeholder: "",
    value: "",
    className: "textInput",
    changefunc: ()=>{
        
    }
}

export default TextBox
