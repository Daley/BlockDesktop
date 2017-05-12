"use strict";
const React = require('react');
const ReactDOM = require('react-dom');
const Dialog_1 = require('material-ui/Dialog');
const FlatButton_1 = require('material-ui/FlatButton');
const MuiThemeProvider_1 = require('material-ui/styles/MuiThemeProvider');
const TextField_1 = require('material-ui/TextField');
class ConfirmDialog extends React.Component {
    handleOk() {
        this.closeDialog(true);
    }
    handleCancel() {
        this.closeDialog(false);
    }
    closeDialog(b) {
        if (this.dialogCb) {
            this.dialogCb(b);
        }
        closeDialog();
    }
    render() {
        const actions = [
            React.createElement(FlatButton_1.default, {label: "取消", primary: true, onTouchTap: this.handleCancel.bind(this)}),
            React.createElement(FlatButton_1.default, {label: "确定", primary: true, keyboardFocused: true, onTouchTap: this.handleOk.bind(this)}),
        ];
        return (React.createElement(Dialog_1.default, {title: "对话框", actions: actions, modal: true, open: true, onRequestClose: this.handleCancel.bind(this)}, this.props.msg));
    }
}
class InputDialog extends React.Component {
    handleCancel() {
        closeDialog();
    }
    handleOk() {
        console.log(this.refs);
        var txt = this.refs['txtInput'];
        console.log("输入的内容", txt.getValue());
        if (txt.getValue() == "") {
            console.log("请输入内容");
            return;
        }
        this.props.callback(txt.getValue());
        closeDialog();
    }
    render() {
        const actions = [
            React.createElement(FlatButton_1.default, {label: "取消", primary: true, onTouchTap: this.handleCancel.bind(this)}),
            React.createElement(FlatButton_1.default, {label: "确定", primary: true, keyboardFocused: true, onTouchTap: this.handleOk.bind(this)}),
        ];
        const input = (React.createElement(TextField_1.default, {ref: "txtInput", hintText: "请输入内容"}));
        return (React.createElement(Dialog_1.default, {title: "输入框", actions: actions, modal: true, open: true, onRequestClose: this.handleCancel.bind(this)}, 
            this.props.msg, 
            React.createElement("br", null), 
            input));
    }
}
var dialog = document.getElementById('dialog');
function showConfirm(msg, cb) {
    ReactDOM.render(React.createElement(MuiThemeProvider_1.default, null, 
        React.createElement(ConfirmDialog, {msg: msg, callback: cb})
    ), dialog);
}
exports.showConfirm = showConfirm;
function showInput(msg, cb) {
    ReactDOM.render(React.createElement(MuiThemeProvider_1.default, null, 
        React.createElement(InputDialog, {msg: msg, callback: cb})
    ), dialog);
}
exports.showInput = showInput;
function closeDialog() {
    ReactDOM.render(React.createElement("div", null), dialog);
}
exports.closeDialog = closeDialog;
