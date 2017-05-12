
import * as React from 'react';
import { Component, PropTypes } from 'react';
import * as data from "../model/DataProxy"

import { List, ListItem, makeSelectable } from 'material-ui/List';
import app from "../app"

import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import MobileTearSheet from "../MobileTearSheet"
import IconButton from 'material-ui/IconButton'

import FileCreateNewFolder from 'material-ui/svg-icons/file/create-new-folder';
import ContentAddBox from 'material-ui/svg-icons/content/add-box';
import ContentSave from 'material-ui/svg-icons/content/save';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import ActionRestore from 'material-ui/svg-icons/action/restore'
import ActionOpenInNew from 'material-ui/svg-icons/action/open-in-new'


import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const {remote, clipboard} = require('electron');
const { dialog } = remote;

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component<any, any> {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
      if (this.props.onChange) {
        this.props.onChange(index);
      }
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
          >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

function addFolder() {
  app.showInput("添加文件夹", (value: string) => {
    var vo = new data.FolderVo();
    vo.name = value;
    app.data.vo.list.push(vo);
    app.updateJobList();
  });
}

function runCode() {
  app.runtime.runFileVo(app.curFile, null);
}

function saveAs() {
  dialog.showSaveDialog((filename: string) => {
    app.data.saveAs(filename);
  });
}

function open() {
  dialog.showSaveDialog((filename: string) => {
    app.data.openFile(filename);
  });
}

var SList = wrapState(SelectableList);

var btns = [<ActionOpenInNew />, <ContentSave />, <ActionRestore />, <ContentAddBox />, <AvPlayArrow />];
var btnTips = ['打开', '保存', '另存为', '添加文件夹', '运行']

function tapBtn(v) {
  var hands = [open, app.data.save.bind(app.data), saveAs, addFolder, runCode];
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


const btnGroup = (
  <div>
    {btns.map((v, i) => {
      return <IconButton key={btnTips[i]} tooltip={btnTips[i]} onTouchTap={tapBtn.bind(this, i)} >
        {v}
      </IconButton>
    })}
  </div>
)

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="操作"
    tooltipPosition="bottom-left"
    >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

/**文件夹的菜单 */
class FolderMenu extends React.Component<{ list: data.FolderVo[], vo: data.FolderVo }, any>{

  private addFile() {
    app.showInput("输入文件名", (value: string) => {
      var vo = new data.FileVo();
      vo.name = value;
      this.props.vo.files.push(vo);
      app.updateJobList();
    })
  }

  public rename() {
    app.showInput("输入新文件名", (value: string) => {
      this.props.vo.name = value;
      app.updateJobList();
    })
  }

  private delThis() {
    var idx = this.props.list.indexOf(this.props.vo);
    if (idx > -1) {
      this.props.list.splice(idx, 1);
      app.updateJobList();
    }
  }

  public render() {
    return <IconMenu {...this.props} iconButtonElement={iconButtonElement}>
      <MenuItem onTouchTap={this.rename.bind(this)}>重命名</MenuItem>
      <MenuItem onTouchTap={this.addFile.bind(this)}>添加程序</MenuItem>
      <MenuItem onTouchTap={this.delThis.bind(this)}>删除</MenuItem>
    </IconMenu>
  }
}
/**文件的菜单 */
class FileMenu extends React.Component<{ list: data.FileVo[], vo: data.FileVo }, any>{


  public rename() {
    app.showInput("输入新文件名", (value: string) => {
      this.props.vo.name = value;
      app.updateJobList();
    })
  }

  private duplicate() {
    app.showInput("输入文件名", (value: string) => {
      var vo = new data.FileVo();
      vo.name = value;
      vo.text = this.props.vo.text;
      this.props.list.push(vo);
      app.updateJobList();
    })
  }

  private delThis() {
    var idx = this.props.list.indexOf(this.props.vo);
    if (idx > -1) {
      this.props.list.splice(idx, 1);
      app.updateJobList();
    }
  }

  public render() {
    return <IconMenu {...this.props} iconButtonElement={iconButtonElement}>
      <MenuItem onTouchTap={this.rename.bind(this)}>重命名</MenuItem>
      <MenuItem onTouchTap={this.delThis.bind(this)}>删除</MenuItem>
      <MenuItem onTouchTap={this.duplicate.bind(this)}>复制</MenuItem>
    </IconMenu>
  }
}

/**列表 */
class JobList extends React.Component<any, data.AppVo>{

  // private handleNestedListToggle = (item:ListItem) => {
  //   this.setState({
  //     open: item.state.open,
  //   });
  // };
  private dict: any = {};

  private getFolderItems(vo: data.AppVo) {
    var inc = 1;
    this.dict = {};
    var getFiles = (v: data.FolderVo) => {
      if (v.files == null || v.files.length == 0) {
        return [];
      }
      return v.files.map((f) => {
        var id = inc++;
        this.dict[id] = f;
        return <ListItem
          value={id}
          key={id.toString()}
          primaryText={f.name}
          rightIconButton={<FileMenu list={v.files} vo={f} />}
          />
      })
    }
    //<FolderMenu list={vo.list} vo={f}  
    return vo.list.map((f) => {

      var id = inc++;
      var arr = getFiles(f);
      this.dict[id] = f;
      //console.log(id,f,arr);
      return <ListItem
        key={id.toString()}
        value={id}
        primaryText={f.name}
        primaryTogglesNestedList={true}
        // onNestedListToggle={this.handleNestedListToggle}
        nestedItems={arr}
        rightIconButton={<FolderMenu list={vo.list} vo={f} />}
        />
    })
  }

  public componentDidMount() {
    this.refresh();
    app.evt.addListener(app.evt.LIST_UPDATE, this.refresh.bind(this));
  }

  public refresh() {
    //console.log("LIST_UPDATE")
    this.setState(app.data.vo);
    setTimeout(() => {
      this.onChangeIndex(Number(app.data.vo.lastEdit));
    }, 800);
  }

  public onChangeIndex(id: number) {
    if (this.dict[id] == null) {
      console.log("onChangeIndex", this.dict, id)
      return;
    }
    var vo = this.dict[id] as data.FileVo;

    //console.log("onChageIndex",id,vo);
    app.data.vo.lastEdit = id;
    // if(vo&&vo.text){
    app.setCurFile(vo);
    // }

  }

  public render() {
    if (this.state == null) {
      return btnGroup;
    }
    var value = Number(this.state.lastEdit);
    if (isNaN(value)) {
      value = 0;
    }
    console.log("defaultValue", value, this.state);
    return <div>
      {btnGroup}
      <SList defaultValue={value} onChange={this.onChangeIndex.bind(this)}>
        {this.getFolderItems(this.state)}
      </SList>
    </div>
  }
}

export default JobList;