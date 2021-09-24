const { app, BrowserWindow, ipcMain } = require('electron');
// const path = require('path')
const ipc=ipcMain;
function createWindow () {
    const win = new BrowserWindow({
    width: 800,
    height: 700,
    minWidth: 800,
    minHeight: 700,
    maxWidth: 800,
    frame: false,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true,
        // preload: path.join(__dirname, 'preload.js')
    }
    })

    // win.loadFile('./frontend/index.html');
    win.loadURL('http://localhost:3000');

    ////IPC////
    ipc.on("closeApp", ()=>{
        win.close();
    })
    ipc.on("minimizeApp", ()=>{
        win.minimize();
    })
    
    ipc.on("maximizeApp", ()=>{
        if (!win.isMaximized()) {
            win.maximize();          
        } else {
            win.unmaximize();
        }
    })
    
    win.on("maximize", ()=>{
        win.webContents.send("maximized");
    })
    win.on("unmaximize", ()=>{
        win.webContents.send("restored");
    })

}

app.whenReady().then(() => {
    createWindow()
    
    app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
