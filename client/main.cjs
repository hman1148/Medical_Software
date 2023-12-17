const {app, BrowserWindow, screen} = require("electron");
const {exec} = require("child_process");
const os = require("os");
// import {app, BrowserWindow, screen} from "electron";

let mainWindow;
let viteServer, djangoServer;

let createWindow = () => {
    const {width, height} = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: Math.round(width * 0.5),
        height: Math.round(height * 0.5),
        widthPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL("http://localhost:8000");
    mainWindow.webContents.setZoomFactor(1.2);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

let startServer = () => {

    let viteCommand, djangoCommand;
    let pathToFront, pathToBack;

    if (process.platform == "win32" || process.platform == "win64") {
       //windows 
        viteCommand = "";
        djangoCommand = "";
        pathToFront = "";
        pathToBack = "";

    } else {
        // Linux and MacOS

        viteCommand = "";
        djangoCommand = "";
        pathToFront = "";
        pathToBack = "";
    }

    // execute the front end script
    exec(viteCommand, {cwd: pathToFront});

    exec(djangoCommand, {cwd: pathToBack});

}


app.whenReady().then(() => {
    // startTheServer and create the window
    createWindow();
    // startServer();
    app.on('activate', () => {
        if (mainWindow === null) createWindow();
    });
});
