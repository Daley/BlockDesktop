console.log("1",Date.now());
import * as React from 'react';
import * as ReactDOM from 'react-dom';
console.log("1.1",Date.now());
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import JobList from './views/JobList';
import app from "./app"

import * as injectTapEventPlugin from 'react-tap-event-plugin'; 
console.log("2",Date.now());

injectTapEventPlugin();
console.log("3",Date.now());

app.init();
ReactDOM.render(
  <MuiThemeProvider>
  <JobList />
  </MuiThemeProvider>,
  document.getElementsByClassName('app-left')[0]
);



  // var code = Blockly.JavaScript.workspaceToCode(workspace);
  // var xmlDom = Blockly.Xml.workspaceToDom(workspace);