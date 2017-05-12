"use strict";
var exec = require('child_process').exec;
var cpFile = require('cp-file');
var copydir = require('copy-dir');
var rmdir = require('rmdir');
const app_1 = require("../app");
const fs = require('fs');
var win = {
    alert: (str) => {
        console.log(str);
    }
};
var runTimeObj = {
    //变量替换
    replaceVar: (env, value) => {
        for (var name in env) {
            var val = env[name];
            var repVal = val;
            value = value.replace(new RegExp("\\$" + name, 'g'), repVal);
        }
        return value;
    },
    //http请求 
    requestHttp: (url, method, callback) => {
        console.log("http", url, method);
        var client = require('http-api-client');
        var u = new URL(url);
        ;
        client.request({
            url: u.toString(),
            encoding: 'utf8',
            method: method.toUpperCase(),
        }).then(function (response) {
            console.log('httpResult', url, response.getStatusCode(), response.getData());
            callback(null, { url: url, res: response.getData() });
        });
    },
    //复制文件
    copyFile: (copyFrom, copyTo, env, findVar, callback) => {
        //暂时只支持utf-8，查找所有变量
        console.log("copy file:" + copyFrom, copyTo);
        if (findVar) {
            var cont = fs.readFile(copyFrom, 'utf-8', (e, data) => {
                data = runTimeObj.replaceVar(env, data);
                fs.writeFile(copyTo, data, 'utf-8', (e) => {
                    callback(null, 'copy file ok');
                });
            });
            return;
        }
        cpFile(copyFrom, copyTo, { overwrite: true }).then(() => {
            callback(null, 'copy file ok');
        });
    },
    //复制目录
    copyDir: (copyFrom, copyTo, callback) => {
        console.log("copy dir", copyFrom, copyTo, callback);
        copydir(copyFrom, copyTo, (e) => {
            callback(e, e ? "null" : 'copy dir ok');
        });
    },
    //删除目录
    rmdir: (path, callback) => {
        console.log("rmdir:" + path);
        rmdir(path, function (err, dirs, files) {
            //console.log("rmdirs",dirs,files);
            callback(err, err ? null : { dirs: dirs, files: files });
        });
    },
    //删除文件 
    rmFile: (path, callback) => {
        fs.unlink(path, (e) => {
            if (e)
                return callback(e);
            console.log('"' + path + '" has been removed!');
            callback(null, { file: path });
        });
    },
    //运行命令
    runCmd: (cmdStr, env, callback) => {
        var cwd = env.root || process.cwd();
        console.log("runCmd", cmdStr);
        exec(cmdStr, { cwd: cwd, maxBuffer: 2000 * 1024 }, (err, stdout, stderr) => {
            callback(err, err ? "运行命令成功！" : "运行命令失败！");
            //console.log(`stdout: ${stdout}`);
        });
    },
    //保存文件
    saveFile: (file, cont, encoding, callback) => {
        console.log("saveFile", file);
        fs.writeFile(file, cont, encoding, (err) => {
            callback(err, err ? "成功写入文件！" : "写入文件失败！");
        });
    },
    //运行一个字子项目 env外部变量
    runJob: (name, env, callback) => {
    },
    //zip
    zipDir: (path, fileName, callback) => {
        var zipdir = require('zip-dir');
        zipdir(path, { saveTo: fileName }, function (err, buffer) {
            // `buffer` is the buffer of the zipped file
        });
    },
    //ftp上传
    ftpUpload: () => {
    },
    /**子程序 */
    runFileByName: (name, env, callback = null) => {
        var vo = app_1.default.data.getFileVoByName(name);
        if (vo) {
            console.log("没有找到程序:" + name);
        }
        app_1.default.runtime.runFileVo(vo, env, false, callback);
    }
};
/** */
class Runtime {
    /**不知道怎么说啊 */
    createInterpreter(env, interpreter, scope, helper) {
        interpreter.setProperty(scope, 'runtime', helper.nativeValueToInterpreter(runTimeObj));
        interpreter.setProperty(scope, 'console', helper.nativeValueToInterpreter(window.console));
        interpreter.setProperty(scope, 'win', helper.nativeValueToInterpreter(win));
        interpreter.setProperty(scope, 'outer', helper.nativeValueToInterpreter(env));
    }
    ;
    init() {
        this.workspace = new Blockly.Workspace();
    }
    runFileVo(vo, env, notRun = false, callback = null) {
        if (vo == null) {
            console.log("空的程序！");
            return;
        }
        if (env == null) {
        }
        this.workspace.clear();
        try {
            var xml = Blockly.Xml.textToDom(vo.text);
        }
        catch (e) {
            alert(e);
            return;
        }
        Blockly.Xml.domToWorkspace(xml, this.workspace);
        var str = Blockly.JavaScript.workspaceToCode(this.workspace);
        var code = app_1.default.codeTemp.replace("__code__", str);
        //认为是根，从此执行
        console.log(code);
        if (notRun) {
            return;
        }
        var myInterpreter = new AsyncInterpreterRunner(code, this.createInterpreter.bind(this, env));
        myInterpreter.run((res) => {
            console.log('run over', res);
            if (callback) {
                callback(null, res);
            }
        });
    }
}
exports.Runtime = Runtime;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Runtime;
