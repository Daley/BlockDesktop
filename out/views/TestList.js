"use strict";
const React = require('react');
const MobileTearSheet_1 = require('../MobileTearSheet');
const List_1 = require('material-ui/List');
const inbox_1 = require('material-ui/svg-icons/content/inbox');
const grade_1 = require('material-ui/svg-icons/action/grade');
const send_1 = require('material-ui/svg-icons/content/send');
const drafts_1 = require('material-ui/svg-icons/content/drafts');
const Divider_1 = require('material-ui/Divider');
const info_1 = require('material-ui/svg-icons/action/info');
const ListExampleSimple = () => (React.createElement(MobileTearSheet_1.default, null, 
    React.createElement(List_1.List, null, 
        React.createElement(List_1.ListItem, {primaryText: "Inbox", leftIcon: React.createElement(inbox_1.default, null)}), 
        React.createElement(List_1.ListItem, {primaryText: "Starred", leftIcon: React.createElement(grade_1.default, null)}), 
        React.createElement(List_1.ListItem, {primaryText: "Sent mail", leftIcon: React.createElement(send_1.default, null)}), 
        React.createElement(List_1.ListItem, {primaryText: "Drafts", leftIcon: React.createElement(drafts_1.default, null)}), 
        React.createElement(List_1.ListItem, {primaryText: "Inbox", leftIcon: React.createElement(inbox_1.default, null)})), 
    React.createElement(Divider_1.default, null), 
    React.createElement(List_1.List, null, 
        React.createElement(List_1.ListItem, {primaryText: "All mail", rightIcon: React.createElement(info_1.default, null)}), 
        React.createElement(List_1.ListItem, {primaryText: "Trash", rightIcon: React.createElement(info_1.default, null)}), 
        React.createElement(List_1.ListItem, {primaryText: "Spam", rightIcon: React.createElement(info_1.default, null)}), 
        React.createElement(List_1.ListItem, {primaryText: "Follow up", rightIcon: React.createElement(info_1.default, null)}))));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ListExampleSimple;
