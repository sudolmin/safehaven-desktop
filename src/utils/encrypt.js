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
    var encpassword = CryptoJS.AES.encrypt(password, salt).toString();
    return encpassword;
}

function decryptpwd(encpassword) {
    var bytes  = CryptoJS.AES.decrypt(encpassword, salt);
    var decpassword = bytes.toString(CryptoJS.enc.Utf8);
    return decpassword;
}

export {
    cryptmd5,
    decryptpwd,
    encryptpwd
}