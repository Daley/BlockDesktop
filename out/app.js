"use strict";
const fs = require('fs');
const dp = require('./model/DataProxy');
const events_1 = require('events');
const Dialogs_1 = require("./views/Dialogs");
const Runtime_1 = require("./model/Runtime");
const electron_1 = require("electron");
class AppEvent extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.LIST_UPDATE = 'list_update';
    }
}
class App {
    constructor() {
        this.showInput = Dialogs_1.showInput;
        this.showConfirm = Dialogs_1.showConfirm;
    }
    getXml() {
        //console.dir(data);
        var data = fs.readFileSync("./xml/toolbox.xml", 'utf-8');
        var parser = new DOMParser();
        return parser.parseFromString(data, "text/xml").documentElement;
    }
    init() {
        console.log("init", Date.now());
        console.log(Blockly.Blocks);
        this.evt = new AppEvent();
        this.data = new dp.DataProxy();
        this.data.init();
        this.runtime = new Runtime_1.Runtime();
        this.runtime.init();
        var blocklyArea = document.getElementById('blocklyArea');
        var blocklyDiv = document.getElementById('blocklyDiv');
        var xml = this.getXml();
        this.workspace = Blockly.inject(blocklyDiv, {
            grid: { spacing: 25, length: 3, colour: '#ccc', snap: true },
            media: './media/',
            toolbox: xml,
            zoom: { controls: true, wheel: true }
        });
        var onresize = (e) => {
            // Compute the absolute coordinates and dimensions of blocklyArea.
            var element = blocklyArea;
            var x = 0;
            var y = 0;
            do {
                x += element.offsetLeft;
                y += element.offsetTop;
                element = element.offsetParent;
            } while (element);
            //console.log("onresize1",blocklyArea.offsetLeft,blocklyArea.offsetWidth, blocklyArea.offsetHeight);
            x = 250;
            y = 0;
            // Position blocklyDiv over blocklyArea.
            blocklyDiv.style.left = x + 'px';
            blocklyDiv.style.top = y + 'px';
            blocklyDiv.style.width = (blocklyArea.offsetWidth - x) + 'px';
            blocklyDiv.style.height = (blocklyArea.offsetHeight - 5) + 'px';
            Blockly.svgResize(this.workspace);
            //this.workspace.resize();
        };
        onresize(null);
        window.addEventListener('resize', onresize, false);
        this.workspace.addChangeListener(this.onBlocklyChg.bind(this));
        //代码模板
        fs.readFile("./tmp/code.txt", 'utf-8', (e, str) => {
            this.codeTemp = str;
        });
        //主进程事件
        electron_1.ipcRenderer.on('MainEvent', (event, message) => {
            if (message == 'save') {
                this.data.save();
            }
            else if (message == 'run') {
                this.runtime.runFileVo(this.curFile, null);
            }
            else if (message == 'test') {
                this.runtime.runFileVo(this.curFile, null, true);
            }
            else if (message == 'enable') {
                if (this.curEle) {
                    this.curEle.setDisabled(!this.curEle.disabled);
                }
            }
        });
    }
    onBlocklyChg(e) {
        console.log("onBlocklyChg", e.type, e);
        if (e.type == Blockly.Events.UI || e.type == Blockly.Events.CREATE) {
            if (e.type == Blockly.Events.UI) {
                if (e.element = 'click') {
                    var ele = this.workspace.getBlockById(e.blockId);
                    this.curEle = ele;
                }
            }
            return;
        }
        var dom = Blockly.Xml.workspaceToDom(this.workspace);
        var xml = Blockly.Xml.domToText(dom);
        //console.log("sssssssssssss",e.type,xml,this.curFile);
        if (this.curFile) {
            this.curFile.text = xml;
        }
    }
    updateJobList() {
        app.evt.emit(app.evt.LIST_UPDATE);
    }
    /**当前编辑的文件 */
    setCurFile(file) {
        this.curFile = file;
        this.workspace.clear();
        if (file.text == "") {
            return;
        }
        var dom = Blockly.Xml.textToDom(file.text);
        //console.log("setCurFile",dom);
        Blockly.Xml.domToWorkspace(dom, this.workspace);
    }
}
var app = new App();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
