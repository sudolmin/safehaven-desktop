import { useState } from "react";
// import Alert from "./Alert";
import Buttons from "../Buttons"
import TextBox from "../TextBox"
import Note from "../Note";
import PasswordStrengthBar from 'react-password-strength-bar';
const { setMasterKeyHandler, mkeysrecycler } = require("../../utils/bridge");

const SetMasterKey = ({setmode, changekey}) => {

    const [masterkey, setmasterkey] = useState('');
    const [disabled, setdisabled] = useState(true);

    const welcomeNote = "Welcome, it looks like it's your first time here. Please set a strong and secure MasterKey";
    const changekeyNote = "Hey, wanna change your master key? Change it to something ridiculously long and strong.";

    function textboxvalue(e) {
        var newvalue = e.target.value;
        setmasterkey(newvalue);
        if (newvalue.length>=6) {
            setdisabled(false);
        } else{
            setdisabled(true);
        }
    }

    const submit = async () => {
        if (masterkey === "") {
            alert("Master Key cannot be an empty string..");
            return;
        }
        setMasterKeyHandler(masterkey);
        if (changekey) {
            mkeysrecycler(masterkey);
        }
        setmode('login');
    }

    return (
        <div className="full grid-center gradient-bg">
            <div className="grid-wgap">
                <Note innertext= {!changekey?welcomeNote:changekeyNote} />
                <p style={{textAlign:"center", fontSize:"12px", fontStyle:"italic"}}>Don't worry. Nothing stays in plain, it'll will digested by MD5 enzyme.</p>
                <TextBox type="password" className="textInput password" placeholder="Enter Your New Master Key" wrapperClassName="grid-center passwrapper" changefunc={textboxvalue} value={masterkey}/>
                <PasswordStrengthBar password={masterkey} className="custom-strength-bar" />
                {
                    disabled&&<p style={{textAlign:"center", fontSize:"12px", fontStyle:"italic"}}>
                        (Key should be at least 6 characters long. Button disabled.)
                        </p>
                }
                <Buttons innertext={!changekey?"Set":"Change"} clickFunc={submit} disabled={disabled} />
                {
                    changekey&&
                    <p style={{cursor:"pointer", fontSize:"13px", textAlign:"center", textDecorationLine:"underline"}} onClick={
                        ()=>setmode('login')
                    }>
                        Nevermind, log in again.
                    </p>
                }
            </div>
        </div>
    )
}

SetMasterKey.defaultProps = {
    changekey: false
}

export default SetMasterKey
