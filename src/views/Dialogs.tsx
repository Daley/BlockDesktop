import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as fs from 'fs'
import {EventEmitter} from 'events'
import TextField from 'material-ui/TextField';

class ConfirmDialog extends React.Component<{ msg: string, callback: (b: boolean) => void }, any>{
    private dialogCb: (b: boolean) => void;
    private handleOk() {
        this.closeDialog(true);
    }

    private handleCancel() {
        this.closeDialog(false);
    }

    private closeDialog(b: boolean) {
        if (this.dialogCb) {
            this.dialogCb(b);
        }
        closeDialog();
    }


    public render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleCancel.bind(this) }
                />,
            <FlatButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleOk.bind(this) }
                />,
        ];

        return (<Dialog
            title="对话框"
            actions={actions}
            modal={true}
            open={true}
            onRequestClose={this.handleCancel.bind(this) }
            >
            {this.props.msg}
        </Dialog>);

    }
}

class InputDialog extends React.Component<{ msg: string, callback: (value: string) => void }, any>{

    public handleCancel() {
        closeDialog();
    }

    public handleOk() {
        console.log(this.refs);
        var txt: TextField = this.refs['txtInput'] as TextField;
        console.log("输入的内容", txt.getValue());
        if (txt.getValue() == "") {
            console.log("请输入内容")
            return;
        }
        this.props.callback(txt.getValue());
        closeDialog();
    }

    public render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleCancel.bind(this) }
                />,
            <FlatButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleOk.bind(this) }
                />,
        ];

        const input = (
            <TextField ref="txtInput"
                hintText="请输入内容"
                />
        )

        return (<Dialog
                title="输入框"
                actions={actions}
                modal={true}
                open={true}
                onRequestClose={this.handleCancel.bind(this) }
                >
                {this.props.msg}
                <br/>
                {input}
            </Dialog>)
    }

}


var dialog = document.getElementById('dialog');
export function showConfirm(msg: string, cb: (val: boolean) => void) {

    ReactDOM.render(<MuiThemeProvider>
        <ConfirmDialog msg={msg} callback={cb}/>
    </MuiThemeProvider>, dialog);
}

export function showInput(msg: string, cb: (value: string) => void) {

    ReactDOM.render(<MuiThemeProvider>
        <InputDialog msg={msg} callback={cb}/>
    </MuiThemeProvider>, dialog);
}

export function closeDialog() {
    ReactDOM.render(<div/>, dialog);
}
