import { handleMasterKeylocal } from "./bridge";

const crypto = require("crypto");
var CryptoJS = require("crypto-js");

// const algorithm = 'aes-256-cbc';
const salt = "84hbdksnsus84nh54pf-dmd=d,dos+ksmso82nfp";

function cryptmd5(key){
    const str = key;
    const md5Hasher = crypto.createHmac("md5", salt);
    const pwdhash = md5Hasher.update(str).digest("hex");
    return pwdhash;
}    

function encryptpwd(password) {
    const mastersalt = handleMasterKeylocal("", "get")
    var encpassword = CryptoJS.AES.encrypt(password, mastersalt).toString();
    return encpassword;
}

function decryptpwd(encpassword, oldKey="") {
    const mastersalt = oldKey===""? handleMasterKeylocal("", "get"): oldKey;
    var bytes  = CryptoJS.AES.decrypt(encpassword, mastersalt);
    var decpassword = bytes.toString(CryptoJS.enc.Utf8);
    return decpassword;
}

export {
    cryptmd5,
    decryptpwd,
    encryptpwd
}