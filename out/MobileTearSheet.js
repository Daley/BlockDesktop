"use strict";
const React = require('react');
const react_1 = require('react');
class MobileTearSheet extends react_1.Component {
    render() {
        const { prepareStyles, } = this.context.muiTheme;
        const styles = {
            root: {
                marginBottom: 24,
                marginRight: 24,
                maxWidth: 360,
                width: '100%',
            },
            container: {
                border: 'solid 1px #d9d9d9',
                borderBottom: 'none',
                height: this.props.height,
                overflow: 'hidden',
            },
            bottomTear: {
                display: 'block',
                position: 'relative',
                marginTop: -10,
                maxWidth: 360,
            },
        };
        return (React.createElement("div", {style: prepareStyles(styles.root)}, 
            React.createElement("div", {style: prepareStyles(styles.container)}, this.props.children), 
            React.createElement("img", {style: prepareStyles(styles.bottomTear), src: "images/bottom-tear.svg"})));
    }
}
MobileTearSheet.propTypes = {
    children: react_1.PropTypes.node,
    height: react_1.PropTypes.number.isRequired,
};
MobileTearSheet.defaultProps = {
    height: 500,
};
MobileTearSheet.contextTypes = {
    muiTheme: react_1.PropTypes.object.isRequired,
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MobileTearSheet;
