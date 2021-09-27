import { handleMasterKeylocal } from "./bridge";
import { secretsalt } from "./secret";

const crypto = require("crypto");
var CryptoJS = require("crypto-js");

function cryptmd5(key){
    const str = key;
    const md5Hasher = crypto.createHmac("md5", secretsalt);
    const pwdhash = md5Hasher.update(str).digest("hex");
    return pwdhash;
}    

function encryptdata(password) {
    const mastersalt = handleMasterKeylocal("", "get")
    var encpassword = CryptoJS.AES.encrypt(password, mastersalt).toString();
    return encpassword;
}

function decryptdata(encpassword, oldKey="") {
    const mastersalt = oldKey===""? handleMasterKeylocal("", "get"): oldKey;
    var bytes  = CryptoJS.AES.decrypt(encpassword, mastersalt);
    var decpassword = bytes.toString(CryptoJS.enc.Utf8);
    return decpassword;
}

export {
    cryptmd5,
    decryptdata,
    encryptdata
}