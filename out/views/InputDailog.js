class InputDialog extends {
    const: actions = [
        React.createElement(FlatButton, {label: "取消", primary: true, onTouchTap: this.handleCancel.bind(this)}),
        React.createElement(FlatButton, {label: "确定", primary: true, keyboardFocused: true, onTouchTap: this.handleOk.bind(this)}),
    ],
    const: input = (React.createElement(TextField, {id: "txtInput", hintText: "请输入内容"})),
    ReactDOM: .render(React.createElement(MuiThemeProvider, null, 
        React.createElement(Dialog, {title: "输入框", actions: actions, modal: true, open: true, onRequestClose: this.handleCancel.bind(this)}, 
            msg, 
            React.createElement("br", null), 
            input)
    ), dialog)
} {
}
