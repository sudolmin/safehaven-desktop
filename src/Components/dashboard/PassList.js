import { useEffect, useState } from "react";
import Buttons from "../Buttons";
import ListTile from "./ListTile"
import Menu from "./Menu";
import TextBox from "../TextBox";
import TileForm from "./TileForm";
const { createNewEntry } = require("../../utils/bridge");
const { docClient } = require('../../utils/secret');

const PassList = ({setmode, changeSetKeyMode}) => {

    const [passInfoList, setpassInfoList] = useState([]);
    const [initusername, setinitusername] = useState('');
    const [initplatform, setinitplatform] = useState('');
    const [initpassword, setinitpassword] = useState('');
    const [showModalState, setshowModalState] = useState(false);
    const [modalpwd, setmodalpwd] = useState("");

    const [formid, setformid] = useState(-1);
    
    const copyToClipboard = (e) => {
        e.target.parentNode.previousElementSibling.children[0].setSelectionRange(0, 99999);

        navigator.clipboard.writeText(e.target.parentNode.previousElementSibling.children[0].value);

        alert("The password is copied to clipboard.");
    };

    function showModalPwd(pwd) {
        setmodalpwd(pwd);
        if (showModalState) {
            setshowModalState(false);
        } else {
            setshowModalState(true);
        }
    }

    function addTile(data, mode="") {
        console.log(mode);
        if (mode==="edit") {
            var editedList = [...passInfoList].filter(entry => entry.id !== data['id']);
            var newList = [data, ...editedList];
        } else {
            newList = [data, ...passInfoList];
        }
        console.log(newList);
        createNewEntry(data);
        setpassInfoList(newList);
        setformid(-1);
        setinitusername('');
        setinitplatform('');
        setinitpassword('');
    }

    function editTile(data) {
        setformid(data['id']);
        setinitusername(data['username']);
        setinitplatform(data['platform']);
        setinitpassword(data['passwd']);
    }
    function deleteTile(id, mode="") {
        const newList = [...passInfoList].filter(entry => entry.id !== id);
        setpassInfoList(newList);
        if (mode==="") {
            docClient.delete({
                TableName: "safeheavendb",
                Key: {
                    id: id,
                },
            })
            .promise()
            .then(data => console.log(data.Attributes))
            .catch(console.error)
        }
        
    }

    useEffect(() => {
        docClient.scan({
            TableName: "safeheavendb"
        })
        .promise()
        .then(data => setpassInfoList(data.Items))
        .catch(console.error)
    }, [])

    return (
        <div className="full grid-center gradient-bg passlist-wrap">
            {
                showModalState &&
                
                <div className="overlay grid-center" onClick={showModalPwd}>
                    <div className="modal grid-center">
                        <TextBox value={modalpwd}/>
                        <Buttons innertext={"Copy"} clickFunc={copyToClipboard}/>
                        <Buttons innertext={"Close"} clickFunc={showModalPwd}/>
                    </div>
                </div>
            }
            <Menu setmode={setmode} changeSetKeyMode={changeSetKeyMode}/>
            <div className="brand">
                    <div className="">
                        Safe Heaven
                    </div>
                    <div id="logo"></div>
                </div>
            <div className="listcontainer">
                
                <TileForm newEntry={addTile} editEntry={editTile} initusername={initusername} initplatform={initplatform} id={formid} initpassword={initpassword}/>
                {
                    passInfoList.map((ele)=>{
                            var newEle = false;
                        if (ele.date===undefined) {
                            newEle = true;
                        }

                        return <ListTile key={ele['id']} id={ele['id']} username={ele['username']} platform={ele['platform']} password={ele['passwd']} showModalPwd={showModalPwd} deleteTile={deleteTile} editTile={editTile} newEle={newEle}/>
                    })
                }
            </div>
        </div>
    )
}

export default PassList
