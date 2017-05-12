
declare interface JavaScript {
    workspaceToCode(workspace: any): string;
    valueToCode(block: any, str: string, o: any);
    variableDB_: any

    ORDER_ATOMIC: any
    ORDER_ASSIGNMENT: any
}

declare interface Events {
    CHANGE: string;
    CREATE: string;
    DELETE: string;
    MOVE: string;
    UI: string;
}

declare namespace Blockly {
    function inject(ele: string | HTMLElement, opt: { media: string, toolbox: any, grid: any, zoom?: any }): Workspace;
    function svgResize(workspace:Workspace);

    var JavaScript: JavaScript;
    var Xml: Xml;
    var Events: Events;

    var Blocks: any;
    var Variables: any;

    class Workspace {
        public removeChangeListener(cb: (e: ChangeEvt) => void);
        public addChangeListener(cb: (e: ChangeEvt) => void);

        public getBlockById(id:string):BlockSvg;
        public clear();
        public resize();
    }

    class BlockSvg{
        public disabled:boolean;
        public setDisabled(b:boolean);
    }

}

declare interface ChangeEvt {
    element: string; //'field', 'comment', 'collapsed', 'disabled', 'inline', 'mutate'
    name: string;//	Name of the field if this is a change to a field.
    oldValue: any;   //	value	Original value.
    newValue: any;   //	value	Changed value.

    type: string;//	One of Blockly.Events.CREATE, Blockly.Events.DELETE, Blockly.Events.CHANGE, Blockly.Events.MOVE, Blockly.Events.UI.
    workspaceId: string;//	UUID of workspace. The workspace can be found with Blockly.Workspace.getById(event.workspaceId)
    blockId: string;//	UUID of block. The block can be found with workspace.getBlockById(event.blockId)
    group: any;  //
}

declare interface Xml {
    /**
 * Encode a block tree as XML.
 * @param {!Blockly.Workspace} workspace The workspace containing blocks.
 * @param {boolean} opt_noId True if the encoder should skip the block ids.
 * @return {!Element} XML document.
 */
    workspaceToDom(workspace: Blockly.Workspace, opt_noId?: boolean): Element;

    /**
     * Decode an XML DOM and create blocks on the workspace.
     * @param {!Element} xml XML DOM.
     * @param {!Blockly.Workspace} workspace The workspace.
     */
    domToWorkspace(xml: Element, workspace: Blockly.Workspace);

    /**
     * Decode an XML block tag and create a block (and possibly sub blocks) on the
     * workspace.
     * @param {!Element} xmlBlock XML block element.
     * @param {!Blockly.Workspace} workspace The workspace.
     * @return {!Blockly.Block} The root block created.
     */
    domToBlock(xmlBlock: Element, workspace: Blockly.Workspace);


    /**
     * Converts plain text into a DOM structure.
     * Throws an error if XML doesn't parse.
     * @param {string} text Text representation.
     * @return {!Element} A tree of XML elements.
     */
    textToDom(text: string): Element


    /**
     * Converts a DOM structure into properly indented text.
     * @param {!Element} dom A tree of XML elements.
     * @return {string} Text representation.
     */
    domToPrettyText(dom: Element): string;


    /**
     * Converts a DOM structure into plain text.
     * Currently the text format is fairly ugly: all one line with no whitespace.
     * @param {!Element} dom A tree of XML elements.
     * @return {string} Text representation.
     */
    domToText(dom: Element): string;

    /**
     * Encode a block subtree as XML.
     * @param {!Blockly.Block} block The root block to encode.
     * @param {boolean} opt_noId True if the encoder should skip the block id.
     * @return {!Element} Tree of XML elements.
     */
    blockToDom(block, opt_noId);
}




