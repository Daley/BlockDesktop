import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as fs from 'fs'
import * as dp from './model/DataProxy'
import {EventEmitter} from 'events'
import TextField from 'material-ui/TextField';
import {showInput, showConfirm} from "./views/Dialogs"
import {Runtime} from "./model/Runtime"
import {ipcRenderer} from "electron"

class AppEvent extends EventEmitter {
    public LIST_UPDATE: string = 'list_update';
}

class App {

    public workspace: Blockly.Workspace;
    /**当前选中元素 */
    public curEle:Blockly.BlockSvg;

    public data: dp.DataProxy;
    public evt: AppEvent
    public runtime: Runtime;
    public curFile: dp.FileVo;

    public showInput = showInput;
    public showConfirm = showConfirm;
    //代码模板
    public codeTemp: string;

    

    private getXml() {
        //console.dir(data);
        var data = fs.readFileSync("./xml/toolbox.xml", 'utf-8');
        var parser = new DOMParser();

        return parser.parseFromString(data, "text/xml").documentElement;
    }

    public init() {
        console.log("init",Date.now());
        console.log(Blockly.Blocks);
        this.evt = new AppEvent();
        this.data = new dp.DataProxy();
        this.data.init();

        this.runtime = new Runtime();
        this.runtime.init();

        var blocklyArea = document.getElementById('blocklyArea');
        var blocklyDiv = document.getElementById('blocklyDiv');
        var xml = this.getXml();
        this.workspace = Blockly.inject(blocklyDiv,
            {
                grid: { spacing: 25, length: 3, colour: '#ccc', snap: true },
                media: './media/',
                toolbox: xml,
                zoom: { controls: true, wheel: true }
            });

        var onresize = (e)=> {
            // Compute the absolute coordinates and dimensions of blocklyArea.
            var element: any = blocklyArea;
            var x = 0;
            var y = 0;
            do {
                x += element.offsetLeft;
                y += element.offsetTop;
                element = element.offsetParent;
            } while (element);
            //console.log("onresize1",blocklyArea.offsetLeft,blocklyArea.offsetWidth, blocklyArea.offsetHeight);
            x = 250
            y = 0;
            // Position blocklyDiv over blocklyArea.
            blocklyDiv.style.left = x + 'px';
            blocklyDiv.style.top = y + 'px';
            blocklyDiv.style.width = (blocklyArea.offsetWidth-x) + 'px';
            blocklyDiv.style.height = (blocklyArea.offsetHeight-5) + 'px';

            Blockly.svgResize(this.workspace);
            //this.workspace.resize();
        };

        onresize(null);
        window.addEventListener('resize', onresize, false);

        this.workspace.addChangeListener(this.onBlocklyChg.bind(this));
        //代码模板
        fs.readFile("./tmp/code.txt", 'utf-8', (e: Error, str: string) => {
            this.codeTemp = str;
        })
        //主进程事件
        ipcRenderer.on('MainEvent', (event, message) => {
            if(message=='save'){
                this.data.save();
            }else if(message=='run'){
                this.runtime.runFileVo(this.curFile,null);
            }else if(message=='test'){
                this.runtime.runFileVo(this.curFile,null,true);
            }else if(message=='enable'){
                if(this.curEle){
                    this.curEle.setDisabled(!this.curEle.disabled);
                }
            }
        })
    }

    private onBlocklyChg(e: ChangeEvt) {
        console.log("onBlocklyChg",e.type,e);
        if (e.type == Blockly.Events.UI || e.type == Blockly.Events.CREATE) {
            if(e.type==Blockly.Events.UI){
                if(e.element='click'){
                    var ele=this.workspace.getBlockById(e.blockId);
                    this.curEle=ele;
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

    public updateJobList() {
        app.evt.emit(app.evt.LIST_UPDATE);
    }

    /**当前编辑的文件 */
    public setCurFile(file: dp.FileVo) {
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
export default app;