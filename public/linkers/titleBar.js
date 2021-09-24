const { ipcRenderer } = require("electron")
const ipc = ipcRenderer;

document.getElementById("close-win").addEventListener("click", function (e) {
    ipc.send("closeApp");
});

document.getElementById("min-win").addEventListener("click", function (e) {
    ipc.send("minimizeApp");
});
const maxBtn=document.getElementById("max-win");
maxBtn.addEventListener("click", function (e) {
    ipc.send("maximizeApp");
});

function changeMaxBtn(isMax){
    if(isMax){
        maxBtn.title='Restore';
        maxBtn.querySelector(".active").style.display="none";
        maxBtn.querySelector(".active").className="";
        maxBtn.querySelector("#resWin").style.display="";
        maxBtn.querySelector("#resWin").className="active";
    } else{
        maxBtn.title='Maximize';
        maxBtn.querySelector(".active").style.display="none";
        maxBtn.querySelector(".active").className="";
        maxBtn.querySelector("#maxiM").style.display="";
        maxBtn.querySelector("#maxiM").className="active";
    }
}
ipc.on("maximized", ()=>{changeMaxBtn(true);})
ipc.on("restored", ()=>{changeMaxBtn(false);})