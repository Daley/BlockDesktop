"use strict";
const app_1 = require("../app");
const fs = require('fs');
const async = require('async');
const path = require('path');
/** */
class Runner {
    init() {
        // Blockly.JavaScript['variables_get'] = function (block) {
        //     // Variable getter.
        //     var code = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'),
        //         Blockly.Variables.NAME_TYPE);
        //     return [code, Blockly.JavaScript.ORDER_ATOMIC];
        // };
        // Blockly.JavaScript['variables_set'] = function (block) {
        //     // Variable setter.
        //     var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        //         Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
        //     var varName = Blockly.JavaScript.variableDB_.getName(
        //         block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
        //     return varName + ' = ' + argument0 + ';\n';
        // };
        this.workspace = new Blockly.Workspace();
    }
    runFileVo(vo, env) {
        if (env == null) {
            if (this.tasks != null) {
                console.log("上一次任务还没完！");
                return;
            }
            this.tasks = [(cb) => {
                    cb(null, "开始运行");
                }];
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
        var file = process.cwd() + ["", "tmp", `${vo.name}.js`].join(path.sep);
        console.log("runCode", file, code);
        delete require.cache[file];
        fs.writeFileSync(file, code, 'utf-8');
        var run = require(file).default;
        if (run) {
            run(app_1.default.runner, env);
        }
        //认为是根，从此执行
        if (env == null) {
            async.waterfall(this.tasks, (e, res) => {
                console.log("运行结束");
                this.tasks = null;
            });
        }
    }
    checkTask() {
    }
    addHttpTask(url, method) {
        console.log("http", url, method);
        this.tasks.push((res, cb) => {
            var client = require('http-api-client');
            client.request({
                url: url,
                method: method.toUpperCase(),
            }).then(function (response) {
                console.log('http', url, response.getData());
                response.getStatusCode(); // returns the HTTP status code
                cb(null, { url: url, res: response.getData() });
            });
        });
    }
    addCopyDir(dir, toDir) {
    }
    addCopyFile(file, toFile, hasVar) {
    }
    addFileJob(file) {
    }
}
exports.Runner = Runner;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Runner;
