"use strict";
console.log("1", Date.now());
const React = require('react');
const ReactDOM = require('react-dom');
console.log("1.1", Date.now());
const MuiThemeProvider_1 = require('material-ui/styles/MuiThemeProvider');
const JobList_1 = require('./views/JobList');
const app_1 = require("./app");
const injectTapEventPlugin = require('react-tap-event-plugin');
console.log("2", Date.now());
injectTapEventPlugin();
console.log("3", Date.now());
app_1.default.init();
ReactDOM.render(React.createElement(MuiThemeProvider_1.default, null, 
    React.createElement(JobList_1.default, null)
), document.getElementsByClassName('app-left')[0]);
// var code = Blockly.JavaScript.workspaceToCode(workspace);
// var xmlDom = Blockly.Xml.workspaceToDom(workspace); 
