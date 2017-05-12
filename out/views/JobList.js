"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require('react');
const react_1 = require('react');
const data = require("../model/DataProxy");
const List_1 = require('material-ui/List');
const app_1 = require("../app");
const IconButton_1 = require('material-ui/IconButton');
const add_box_1 = require('material-ui/svg-icons/content/add-box');
const save_1 = require('material-ui/svg-icons/content/save');
const play_arrow_1 = require('material-ui/svg-icons/av/play-arrow');
const restore_1 = require('material-ui/svg-icons/action/restore');
const open_in_new_1 = require('material-ui/svg-icons/action/open-in-new');
const IconMenu_1 = require('material-ui/IconMenu');
const MenuItem_1 = require('material-ui/MenuItem');
const colors_1 = require('material-ui/styles/colors');
const more_vert_1 = require('material-ui/svg-icons/navigation/more-vert');
const { remote, clipboard } = require('electron');
const { dialog } = remote;
let SelectableList = List_1.makeSelectable(List_1.List);
function wrapState(ComposedComponent) {
    return (SelectableList_1 = class SelectableList extends react_1.Component {
            constructor() {
                super(...arguments);
                this.handleRequestChange = (event, index) => {
                    this.setState({
                        selectedIndex: index,
                    });
                    if (this.props.onChange) {
                        this.props.onChange(index);
                    }
                };
            }
            componentWillMount() {
                this.setState({
                    selectedIndex: this.props.defaultValue,
                });
            }
            render() {
                return (React.createElement(ComposedComponent, {value: this.state.selectedIndex, onChange: this.handleRequestChange}, this.props.children));
            }
        },
        SelectableList_1.propTypes = {
            children: react_1.PropTypes.node.isRequired,
            defaultValue: react_1.PropTypes.number.isRequired,
        },
        SelectableList_1);
    var SelectableList_1;
}
function addFolder() {
    app_1.default.showInput("添加文件夹", (value) => {
        var vo = new data.FolderVo();
        vo.name = value;
        app_1.default.data.vo.list.push(vo);
        app_1.default.updateJobList();
    });
}
function runCode() {
    app_1.default.runtime.runFileVo(app_1.default.curFile, null);
}
function saveAs() {
    dialog.showSaveDialog((filename) => {
        app_1.default.data.saveAs(filename);
    });
}
function open() {
    dialog.showSaveDialog((filename) => {
        app_1.default.data.saveAs(filename);
    });
}
var SList = wrapState(SelectableList);
var btns = [React.createElement(open_in_new_1.default, null), React.createElement(save_1.default, null), React.createElement(restore_1.default, null), React.createElement(add_box_1.default, null), React.createElement(play_arrow_1.default, null)];
var btnTips = ['打开', '保存', '另存为', '添加文件夹', '运行'];
function tapBtn(v) {
    var hands = [open, app_1.default.data.save.bind(app_1.default.data), saveAs, addFolder, runCode];
    hands[v]();
    return;
    // var str=Blockly.JavaScript.workspaceToCode(app.workspace);
    // var file=process.cwd()+"/tmp/code.js";
    // str='const app= require("../app");\n\n'+str;
    // fs.writeFileSync(file,str,'utf-8');
    // delete require.cache[file];
    // require(file);
    // var dom = Blockly.Xml.workspaceToDom(app.workspace);
    // console.log(dom);
    //console.log(Blockly.Xml.domToPrettyText(dom));
    // console.log(Blockly.Xml.domToText(dom));
    //console.log(Blockly.Xml.domToText());
}
const btnGroup = (React.createElement("div", null, btns.map((v, i) => {
    return React.createElement(IconButton_1.default, {key: btnTips[i], tooltip: btnTips[i], onTouchTap: tapBtn.bind(this, i)}, v);
})));
const iconButtonElement = (React.createElement(IconButton_1.default, {touch: true, tooltip: "操作", tooltipPosition: "bottom-left"}, 
    React.createElement(more_vert_1.default, {color: colors_1.grey400})
));
/**文件夹的菜单 */
class FolderMenu extends React.Component {
    addFile() {
        app_1.default.showInput("输入文件名", (value) => {
            var vo = new data.FileVo();
            vo.name = value;
            this.props.vo.files.push(vo);
            app_1.default.updateJobList();
        });
    }
    rename() {
        app_1.default.showInput("输入新文件名", (value) => {
            this.props.vo.name = value;
            app_1.default.updateJobList();
        });
    }
    delThis() {
        var idx = this.props.list.indexOf(this.props.vo);
        if (idx > -1) {
            this.props.list.splice(idx, 1);
            app_1.default.updateJobList();
        }
    }
    render() {
        return React.createElement(IconMenu_1.default, __assign({}, this.props, {iconButtonElement: iconButtonElement}), 
            React.createElement(MenuItem_1.default, {onTouchTap: this.rename.bind(this)}, "重命名"), 
            React.createElement(MenuItem_1.default, {onTouchTap: this.addFile.bind(this)}, "添加程序"), 
            React.createElement(MenuItem_1.default, {onTouchTap: this.delThis.bind(this)}, "删除"));
    }
}
/**文件的菜单 */
class FileMenu extends React.Component {
    rename() {
        app_1.default.showInput("输入新文件名", (value) => {
            this.props.vo.name = value;
            app_1.default.updateJobList();
        });
    }
    duplicate() {
        app_1.default.showInput("输入文件名", (value) => {
            var vo = new data.FileVo();
            vo.name = value;
            vo.text = this.props.vo.text;
            this.props.list.push(vo);
            app_1.default.updateJobList();
        });
    }
    delThis() {
        var idx = this.props.list.indexOf(this.props.vo);
        if (idx > -1) {
            this.props.list.splice(idx, 1);
            app_1.default.updateJobList();
        }
    }
    render() {
        return React.createElement(IconMenu_1.default, __assign({}, this.props, {iconButtonElement: iconButtonElement}), 
            React.createElement(MenuItem_1.default, {onTouchTap: this.rename.bind(this)}, "重命名"), 
            React.createElement(MenuItem_1.default, {onTouchTap: this.delThis.bind(this)}, "删除"), 
            React.createElement(MenuItem_1.default, {onTouchTap: this.duplicate.bind(this)}, "复制"));
    }
}
/**列表 */
class JobList extends React.Component {
    constructor() {
        super(...arguments);
        // private handleNestedListToggle = (item:ListItem) => {
        //   this.setState({
        //     open: item.state.open,
        //   });
        // };
        this.dict = {};
    }
    getFolderItems(vo) {
        var inc = 1;
        this.dict = {};
        var getFiles = (v) => {
            if (v.files == null || v.files.length == 0) {
                return [];
            }
            return v.files.map((f) => {
                var id = inc++;
                this.dict[id] = f;
                return React.createElement(List_1.ListItem, {value: id, key: id.toString(), primaryText: f.name, rightIconButton: React.createElement(FileMenu, {list: v.files, vo: f})});
            });
        };
        //<FolderMenu list={vo.list} vo={f}  
        return vo.list.map((f) => {
            var id = inc++;
            var arr = getFiles(f);
            this.dict[id] = f;
            //console.log(id,f,arr);
            return React.createElement(List_1.ListItem, {key: id.toString(), value: id, primaryText: f.name, primaryTogglesNestedList: true, nestedItems: arr, rightIconButton: React.createElement(FolderMenu, {list: vo.list, vo: f})});
        });
    }
    componentDidMount() {
        this.refresh();
        app_1.default.evt.addListener(app_1.default.evt.LIST_UPDATE, this.refresh.bind(this));
    }
    refresh() {
        //console.log("LIST_UPDATE")
        this.setState(app_1.default.data.vo);
        setTimeout(() => {
            this.onChangeIndex(Number(app_1.default.data.vo.lastEdit));
        }, 800);
    }
    onChangeIndex(id) {
        if (this.dict[id] == null) {
            console.log("onChangeIndex", this.dict, id);
            return;
        }
        var vo = this.dict[id];
        //console.log("onChageIndex",id,vo);
        app_1.default.data.vo.lastEdit = id;
        // if(vo&&vo.text){
        app_1.default.setCurFile(vo);
        // }
    }
    render() {
        if (this.state == null) {
            return btnGroup;
        }
        var value = Number(this.state.lastEdit);
        if (isNaN(value)) {
            value = 0;
        }
        console.log("defaultValue", value, this.state);
        return React.createElement("div", null, 
            btnGroup, 
            React.createElement(SList, {defaultValue: value, onChange: this.onChangeIndex.bind(this)}, this.getFolderItems(this.state)));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JobList;
