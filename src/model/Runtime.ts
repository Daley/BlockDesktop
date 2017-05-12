var exec = require('child_process').exec;

interface CopyCall {
    (from: string, to: string, cb: (e: Error) => void);
}
var cpFile = require('cp-file');
var copydir = require('copy-dir') as CopyCall;
var rmdir = require('rmdir');

import * as data from "./DataProxy"
import app from "../app"
import * as fs from 'fs'
import * as async from 'async'
import * as path from 'path'

interface CallbackT<T> {
    (e: Error, res?: T): void;
}
interface Handler {
    (res: any, cb: CallbackT<any>);
}

declare class AsyncInterpreterRunner {
    constructor(code: string, fun: (interpreter, scope, helper) => void)
    run(callback: (res: any) => void);
}

var win = {
    alert: (str: string) => {
        console.log(str)
    }
}

var runTimeObj = {
    //变量替换
    replaceVar: (env: any, value: string) => {
        for (var name in env) {
            var val = env[name];
            var repVal = val;
            value = value.replace(new RegExp("\\$" + name, 'g'), repVal);
        }
        return value;
    },
    //http请求 
    requestHttp: (url: string, method: string, callback: CallbackT<any>) => {
        console.log("http", url, method);
        var client = require('http-api-client');
        var u=new URL(url);
        ;
        client.request({
            url: u.toString(),
            encoding: 'utf8', // optional
            method: method.toUpperCase(),
        }).then(function (response) {
            console.log('httpResult', url, response.getStatusCode(), response.getData());
            callback(null, { url: url, res: response.getData() });
        });
    },
    //复制文件
    copyFile: (copyFrom: string, copyTo: string, env: any, findVar: boolean, callback: CallbackT<any>) => {
        //暂时只支持utf-8，查找所有变量
        console.log("copy file:"+copyFrom,copyTo);
        if (findVar) {
            var cont = fs.readFile(copyFrom, 'utf-8', (e: Error, data: string) => {
                data = runTimeObj.replaceVar(env, data);
                fs.writeFile(copyTo, data, 'utf-8', (e: Error) => {
                    callback(null, 'copy file ok')
                })
            })
            return;
        }

        cpFile(copyFrom, copyTo, { overwrite: true }).then(() => {
            callback(null, 'copy file ok');
        });
    },
    //复制目录
    copyDir: (copyFrom: string, copyTo: string, callback: CallbackT<any>) => {
        console.log("copy dir", copyFrom, copyTo, callback);
        copydir(copyFrom, copyTo, (e: Error) => {
            callback(e, e ? "null" : 'copy dir ok');
        });
    },
    //删除目录
    rmdir: (path: string, callback: CallbackT<any>) => {
        console.log("rmdir:"+path);
        rmdir(path, function (err, dirs, files) {
            //console.log("rmdirs",dirs,files);
            callback(err, err ? null : { dirs: dirs, files: files })
        });
    },
    //删除文件 
    rmFile: (path: string, callback: CallbackT<any>) => {
        fs.unlink(path, (e: Error) => {
            if (e) return callback(e);
            console.log('"' + path + '" has been removed!');
            callback(null, { file: path });
        })
    },
    //运行命令
    runCmd: (cmdStr: string, env: any, callback: CallbackT<any>) => {
        var cwd = env.root || process.cwd();
        console.log("runCmd", cmdStr);
        exec(cmdStr, { cwd: cwd, maxBuffer: 2000 * 1024 }, (err: Error, stdout, stderr) => {
            callback(err, err ? "运行命令成功！" : "运行命令失败！");
            //console.log(`stdout: ${stdout}`);
        });

    },
    //保存文件
    saveFile: (file: string, cont: any, encoding: string, callback: CallbackT<any>) => {
        console.log("saveFile", file);
        fs.writeFile(file, cont, encoding, (err: Error) => {
            callback(err, err ? "成功写入文件！" : "写入文件失败！");
        });
    },
    //运行一个字子项目 env外部变量
    runJob: (name: string, env: any, callback: CallbackT<any>) => {

    },
    //zip
    zipDir: (path: string, fileName: string, callback: CallbackT<any>) => {
        var zipdir = require('zip-dir');
        zipdir(path, { saveTo: fileName }, function (err, buffer) {
            // `buffer` is the buffer of the zipped file
        });
    },
    //ftp上传
    ftpUpload: () => {

    },
    /**子程序 */
    runFileByName:(name: string, env: any, callback: CallbackT<any> = null)=> {
        var vo = app.data.getFileVoByName(name);
        if (vo) {
            console.log("没有找到程序:" + name);
        }
        app.runtime.runFileVo(vo, env, false, callback);
    }
    //svn提交
    //播声音
    //延时
    //email
    //输入框
    //播图片
    //
};


/** */
export class Runtime {

    private workspace: Blockly.Workspace;


    /**不知道怎么说啊 */
    public createInterpreter(env:any,interpreter, scope, helper) {
        interpreter.setProperty(scope, 'runtime',
            helper.nativeValueToInterpreter(runTimeObj));
        interpreter.setProperty(scope, 'console',
            helper.nativeValueToInterpreter(window.console));
        interpreter.setProperty(scope, 'win',
            helper.nativeValueToInterpreter(win));

        interpreter.setProperty(scope, 'outer',
            helper.nativeValueToInterpreter(env));
    };


    public init() {
        this.workspace = new Blockly.Workspace();
    }


    

    public runFileVo(vo: data.FileVo, env: any, notRun: boolean = false, callback: CallbackT<any> = null) {
        if (vo == null) {
            console.log("空的程序！")
            return;
        }
        if (env == null) {

        }

        this.workspace.clear();
        try {
            var xml = Blockly.Xml.textToDom(vo.text)
        } catch (e) {
            alert(e);
            return;
        }
        Blockly.Xml.domToWorkspace(xml, this.workspace);

        var str = Blockly.JavaScript.workspaceToCode(this.workspace);

        var code = app.codeTemp.replace("__code__", str);
        //认为是根，从此执行
        console.log(code);
        if (notRun) {
            return;
        }
        var myInterpreter = new AsyncInterpreterRunner(code, this.createInterpreter.bind(this,env));
        myInterpreter.run((res) => {
            console.log('run over', res);
            if (callback) {
                callback(null, res);
            }
        });
    }

}


export default Runtime;