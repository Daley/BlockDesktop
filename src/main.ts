'use strict';

import * as ele from "electron"
import { app, BrowserWindow, Menu } from "electron";


var win:Electron.BrowserWindow;
function clickMenu(item){
    console.log(item);
}
//菜单
var template = [{
    label: '文件',
    submenu: [
        { label: '新建项目'}, { label: '打开项目' },{label:'保存项目'},
        { type: 'separator' },
        { label: 'quit' }
    ]
}] as Electron.MenuItemOptions[];

//ipcMain
const ipcMain = require('electron').ipcMain;
//创建窗口
let createWindow = () => {
    //console.log(Menu.getApplicationMenu());
    console.log("createWindow",Date.now())
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    menu.addListener("click", (item) => {
        console.log(item);
    })
    
    
    win = new BrowserWindow({ width: 800, height: 900 ,resizable: true});
    win.loadURL(`file://${__dirname}/index.html`);
    win.on("closed", () => {
        win = null;
    });
    //按键
    const electronLocalshortcut = require('electron-localshortcut');
    electronLocalshortcut.register(win, 'ctrl+s', () => {
        win.webContents.send('MainEvent',"save")
    });
    //运行
    electronLocalshortcut.register(win, 'ctrl+r', () => {
        win.webContents.send('MainEvent',"run")
    });
    //输出不运行 测试
    electronLocalshortcut.register(win, 'ctrl+t', () => {
        win.webContents.send('MainEvent',"test")
    });
    //enable/disable指定选中元素
    electronLocalshortcut.register(win, 'ctrl+e', () => {
        win.webContents.send('MainEvent',"enable")
    });
    //刷新
    electronLocalshortcut.register(win, 'F5', () => {
        let win = BrowserWindow.getFocusedWindow();
        if (!win) return;
        win.reload();
    });
    //f6
    electronLocalshortcut.register(win, 'F6', () => {
        let win = BrowserWindow.getFocusedWindow();
        if (!win) return;
        win.webContents.toggleDevTools();
    });


}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});



app.on("activate", () => {
    if (win === null) createWindow();
});





