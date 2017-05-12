"use strict";
const fs = require('fs');
const { remote, clipboard } = require('electron');
const { Menu, MenuItem, dialog } = remote;
class FileVo {
    constructor() {
        this.text = "";
    }
}
exports.FileVo = FileVo;
class FolderVo {
    constructor() {
        this.files = [];
    }
}
exports.FolderVo = FolderVo;
class AppVo {
    constructor() {
        this.list = [];
        this.name = 'unkown';
        this.lastEdit = 0;
    }
}
exports.AppVo = AppVo;
class DataProxy {
    init() {
        //上次打开的
        var str = localStorage.getItem(DataProxy.LAST_FILE);
        if (str) {
            var content = fs.readFileSync(str, 'utf-8');
            console.log("read", str);
            this.vo = JSON.parse(content);
            console.log(str, this.vo);
            this.curFileName = str;
        }
        else {
            this.vo = new AppVo();
        }
    }
    openFile(filename) {
    }
    /**另存为 */
    saveAs(fileName) {
        console.log('saveAs', fileName);
        this.curFileName = fileName;
        localStorage.setItem(DataProxy.LAST_FILE, fileName);
        var str = JSON.stringify(this.vo);
        fs.writeFile(fileName, str, (e, res) => {
            console.log("save ok");
        });
    }
    save() {
        if (this.curFileName) {
            this.saveAs(this.curFileName);
        }
        else {
            dialog.showSaveDialog((filename) => {
                this.saveAs(filename);
            });
        }
    }
    getFileVoByName(name) {
        for (var i = 0; i < this.vo.list.length; i++) {
            var f = this.vo.list[i];
            for (var j = 0; j < f.files.length; j++) {
                var ff = f.files[j];
                if (ff.name == name) {
                    return ff;
                }
            }
        }
        return null;
    }
}
DataProxy.LAST_FILE = 'last_file';
exports.DataProxy = DataProxy;
