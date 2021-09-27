import { docClient } from "./secret";

const { putdata } = require("./dbHandler");
const { cryptmd5, encryptdata, decryptdata} = require("./encrypt");
require('dotenv').config();

const datetimenow = () => {
    let date = new Date();

    const year = date.getFullYear().toString();
    var month = date.getMonth()+1;

    month = month <10 ? "0"+month.toString() : month.toString();

    var day = date.getDate().toString();
    day = day.length <2 ? ("0"+day).toString() : day.toString();
    var hour = date.getHours().toString();
    hour = hour.length <2 ? ("0"+hour).toString() : hour.toString();
    var min = date.getMinutes().toString();
    min = min.length <2 ? ("0"+min).toString() : min.toString();
    var sec = date.getSeconds().toString();
    sec = sec.length <2 ? ("0"+sec).toString() : sec.toString();

    return parseInt(year+month+day+hour+min+sec);
}

const setMasterKeyHandler=async(key)=> {
    const pwdhash = cryptmd5(key);
    await putdata({
        id: "masterkey",
        date: datetimenow(),
        key: pwdhash
    }, "keydb");
}

async function createNewEntry(data) {
    await putdata({
        id: data['id'],
        date: datetimenow(),
        platform: encryptdata(data['platform']),
        username: encryptdata(data['username']),
        passwd: encryptdata(data['passwd'])
    });
}

function handleMasterKeylocal(mkey="", mode="set", ssnkey='currMKey') {
    if (mode==="get") {
        return sessionStorage.getItem(ssnkey);
    }
    sessionStorage.setItem(ssnkey, mkey);
    return;
}

// only called when we change master key
function mkeysrecycler(newmkey) {
    const oldMKey = handleMasterKeylocal("","get");
    handleMasterKeylocal(oldMKey, "set", "oldMKey");
    handleMasterKeylocal(cryptmd5(newmkey));
    reencypter(oldMKey);
}

function reencypter(oldMKey) {

    docClient.scan({
        TableName: "safeheavendb"
    })
    .promise()
    .then(data => {
        const passdata = data.Items;
        for (let index = 0; index < passdata.length; index++) {
        const element = passdata[index];
        var newdata = {
            "id": element["id"],
            "username": decryptdata(element["username"]),
            "passwd": decryptdata(element["passwd"], oldMKey),
            "platform": decryptdata(element["platform"])
        }
        console.log(`Reencrypted ${index+1}/${passdata.length}`);
        createNewEntry(newdata);
    }
    })
    .catch(console.error)
}

export {
    setMasterKeyHandler,
    createNewEntry,
    handleMasterKeylocal,
    mkeysrecycler
}