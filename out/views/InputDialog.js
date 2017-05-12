"use strict";
const React = require('react');
const ReactDOM = require('react-dom');
const Dialog_1 = require('material-ui/Dialog');
const FlatButton_1 = require('material-ui/FlatButton');
const MuiThemeProvider_1 = require('material-ui/styles/MuiThemeProvider');
const TextField_1 = require('material-ui/TextField');
class InputDialog extends React.Component {
    handleCancel() {
    }
    handleOk() {
    }
    render() {
        const actions = [
            React.createElement(FlatButton_1.default, {label: "取消", primary: true, onTouchTap: this.handleCancel.bind(this)}),
            React.createElement(FlatButton_1.default, {label: "确定", primary: true, keyboardFocused: true, onTouchTap: this.handleOk.bind(this)}),
        ];
        const input = (React.createElement(TextField_1.default, {id: "txtInput", hintText: "请输入内容"}));
        return React.createElement(MuiThemeProvider_1.default, null, 
            React.createElement(Dialog_1.default, {title: "输入框", actions: actions, modal: true, open: true, onRequestClose: this.handleCancel.bind(this)}, 
                msg, 
                React.createElement("br", null), 
                input)
        );
    }
}
function showInput(msg, cb) {
    var dialog = document.getElementById('dialog');
    ReactDOM.render(React.createElement(InputDialog, {msg: msg, func: cb}), dialog);
}
exports.showInput = showInput;
function closeDialog() {
    var dialog = document.getElementById('dialog');
    ReactDOM.render(React.createElement("div", null), dialog);
}
exports.closeDialog = closeDialog;
