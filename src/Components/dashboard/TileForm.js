import TextBox from "../TextBox"
import Buttons from "../Buttons";
import { FaArrowRight} from 'react-icons/fa'
import { useEffect, useState } from "react";
import PasswordStrengthBar from 'react-password-strength-bar';

const TileForm = ({newEntry, initusername, initplatform, initpassword, id}) => {
    const [username, setusername] = useState(initusername);
    const [platform, setplatform] = useState(initplatform);
    const [password, setpassword] = useState(initpassword);
    const [showpwdindicator, setshowpwdindicator] = useState(false);

    function textboxusernamevalue(e) {
        var newvalue = e.target.value;
        setusername(newvalue);
    }    
    function textboxplatformvalue(e) {
        var newvalue = e.target.value;
        setplatform(newvalue);
    }    
    function textboxpasswordvalue(e) {
        var newvalue = e.target.value;
        setpassword(newvalue);
        if (newvalue.length>0) {
            setshowpwdindicator(true);
        } else {
            setshowpwdindicator(false);
        }
    }

    function formSubmit(e) {
        if(username.length===0 ||
            password.length===0 ||
            platform.length===0){
            alert("The fields cant be empty. Please fill and try again.");
            return;
        }
        var data = {
            "id": id=== -1 ?Math.floor(Math.random()*10000000):id,
            "username": username,
            "passwd": password ,
            "platform": platform
        };
        var mode= id !== -1 ?"edit":"";
        newEntry(data, mode);
        setusername('');
        setplatform('');
        setpassword('');
        setshowpwdindicator(false);
    }

    useEffect(() => {
        setusername(initusername);
        setplatform(initplatform);
        setpassword(initpassword);
    }, [initusername,initplatform,initpassword])

    return (
        <div className="form-wrapper">
            <TextBox id="username-form-textbox" placeholder="Enter Username" changefunc={textboxusernamevalue} value={username}/>
            <TextBox id="platform-form-textbox" placeholder="Enter Platform" changefunc={textboxplatformvalue} value={platform}/>
            <TextBox id="password-form-textbox" type="password"  wrapperClassName="grid-center passwrapper" className="textInput password" placeholder="Enter Password" changefunc={textboxpasswordvalue} value={password}/>
            <Buttons id="add-password-btn" innertext={<FaArrowRight/>} clickFunc={formSubmit}/>
            {
                showpwdindicator&&<PasswordStrengthBar password={password} className="custom-strength-bar ingrid" />
            }
            
        </div>
    )
}

TileForm.defaultProps = {
    initusername: "",
    initplatform: "",
    initpassword: ""
}

export default TileForm
