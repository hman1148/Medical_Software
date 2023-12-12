const {app, BrowserWindow, screen} = require("electron");
// import {app, BrowserWindow, screen} from "electron";

let mainWindow;

let createWindow = () => {
    const {width, height} = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: Math.round(width * 0.5),
        height: Math.round(height * 0.5),
        widthPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadUrl("http://localhost:8000");
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}


app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (mainWindow === null) createWindow();
    });
});
