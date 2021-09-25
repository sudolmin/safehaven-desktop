import { useState } from "react";
import { cryptmd5 } from "../../utils/encrypt";
import Buttons from "../Buttons"
import Note from "../Note";
import TextBox from "../TextBox"
const { docClient } = require('../../utils/secret');
const { handleMasterKeylocal } = require('../../utils/bridge');

const MasterKey = ({setmode}) => {

    const [masterkey, setmasterkey] = useState('');
    const [incorrectcred, setincorrectcred] = useState(false);
    // const [alert, setalert] = useState(false);

    const note = "Welcome back, Please enter your master key, so I can let you into Safe Heaven";

    function textboxvalue(e) {
        var newvalue = e.target.value;
        setmasterkey(newvalue);
        setincorrectcred(false);
    }
    function submit(){
        if (masterkey === "") {
            alert("Master Key cannot be an empty string..");
            return;
        }
        
        docClient.get({
            TableName: "keydb",
            Key: {
                id: "masterkey",
            },
        })
        .promise()
        .then((data) => {
            if(data.Item['key']===cryptmd5(masterkey)){
                setmode("passlist");
                handleMasterKeylocal(cryptmd5(masterkey))
            }else{
                setincorrectcred(true);
            }
            })
        .catch(console.error);
    }

    return (
        <div className="full grid-center gradient-bg">
            
            <div className="grid-wgap">
                <Note innertext= {note} />
                <TextBox type="password" className="textInput password" placeholder="Enter Your Master Key" wrapperClassName="grid-center passwrapper" changefunc={textboxvalue} value={masterkey}/>
                {
                    incorrectcred&&
                    <p style={{textAlign:"center", fontSize:"12px", color:"#FF5D5D"}}>
                        Key is incorrect.
                        </p>
                }
                <Buttons innertext="Authenticate" clickFunc={submit}/>
            </div>
        </div>
    )
}

export default MasterKey
