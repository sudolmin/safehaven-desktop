const { putdata } = require("./dbHandler");
const { cryptmd5, encryptpwd} = require("./encrypt");
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
    const pwdhash = encryptpwd(data['passwd']);
    await putdata({
        id: data['id'],
        date: datetimenow(),
        platform: data['platform'],
        username: data['username'],
        passwd: pwdhash
    });
}

export {
    setMasterKeyHandler,
    createNewEntry,
}