

Blockly.Blocks['http'] = {
  init: function () {
    this.appendValueInput("url")
      .setCheck("String")
      .appendField("http请求");
    this.appendValueInput("method")
      .setCheck("String")
      .appendField("method");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['getter'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("取变量")
      .appendField(new Blockly.FieldTextInput("name"), "name");
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['setter'] = {
  init: function () {
    this.appendValueInput("NAME")
      .setCheck(null)
      .appendField("设变量")
      .appendField(new Blockly.FieldTextInput("name"), "name");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['copy_file'] = {
  init: function () {
    this.appendValueInput("from")
      .setCheck(null)
      .appendField("复制文件 from");
    this.appendValueInput("to")
      .setCheck(null)
      .appendField("to");
    this.appendDummyInput()
      .appendField("findVar")
      .appendField(new Blockly.FieldCheckbox("TRUE"), "findVar");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('findVar 如果为true 交会以utf-8来读取文件，从变量中查找 $变量名 替换为变量值');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['run_cmd'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox("TRUE"), "valuable");
    this.appendValueInput("cmd")
      .setCheck(null)
      .appendField("运行命令");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('运行命令啊');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['copy_dir'] = {
  init: function () {
    this.appendValueInput("from")
      .setCheck(null)
      .appendField("复制目录 from");
    this.appendValueInput("to")
      .setCheck(null)
      .appendField("to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['var_str'] = {
  init: function () {
    this.appendValueInput("str")
      .setCheck("String")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("变量串");
    this.setOutput(true, "String");
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['v_str'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('变量串')
        .appendField(new Blockly.FieldTextInput(''), 'str');

    this.setOutput(true, "String");
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['save_file'] = {
  init: function () {
    this.appendValueInput("content")
      .setCheck("String")
      .appendField("保存内容");
    this.appendValueInput("file")
      .setCheck("String")
      .appendField("路径");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['play_sound'] = {
  init: function () {
    this.appendValueInput("sound")
      .setCheck("String")
      .appendField("播放声音");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['result'] = {
  init: function () {
    this.jsonInit({
      "message0": "异步结果"
    });
    this.setOutput(true, null);
    this.setColour(260);
    this.setTooltip('运行命令 http 等都会有返回');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['json_result'] = {
  init: function () {
    this.jsonInit({
      "message0": "json异步结果"
    });
    this.setOutput(true, "String");
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['rm_file'] = {
  init: function () {
    this.appendValueInput("file")
      .setCheck("String")
      .appendField("删除文件");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['rm_dir'] = {
  init: function () {
    this.appendValueInput("dir")
      .setCheck("String")
      .appendField("删除目录");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['run_job'] = {
  init: function () {
    this.appendValueInput("name")
      .setCheck("String")
      .appendField("程序名");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('运行你创建的另一个程序，变量会优先用当前程序的');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['text_add'] = {
  init: function () {
    this.jsonInit({
      "type": "text_add",
      "message0": "字符串连接 %1 + %2",
      "args0": [
        {
          "type": "input_value",
          "name": "A"
        },
        {
          "type": "input_value",
          "name": "B"
        }
      ],
      "inputsInline": true,
      "output": "String",
      "colour": 230,
      "helpUrl": "https://en.wikipedia.org/wiki/Arithmetic"
    });
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip('');
  }
};



//*********************************** JavaScript **************************

Blockly.JavaScript['http'] = function (block) {
  var value_url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_ATOMIC);
  var value_method = Blockly.JavaScript.valueToCode(block, 'method', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `runtime.requestHttp(${value_url},${value_method},asyncWait);\n`;
  return code;
};

Blockly.JavaScript['getter'] = function (block) {
  var text_name = block.getFieldValue('name');

  var code = `env.${text_name}`;
  //return code;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['setter'] = function (block) {
  var text_name = block.getFieldValue('name');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `setter('${text_name}',${value_name});\n`;
  return code;
};

Blockly.JavaScript['copy_file'] = function (block) {
  var value_from = Blockly.JavaScript.valueToCode(block, 'from', Blockly.JavaScript.ORDER_ATOMIC);
  var value_to = Blockly.JavaScript.valueToCode(block, 'to', Blockly.JavaScript.ORDER_ATOMIC);
  var checkbox_findvar = block.getFieldValue('findVar') == 'TRUE';

  var code = `runtime.copyFile(${value_from},${value_to},env,${checkbox_findvar},asyncWait);\n`;
  return code;
};

Blockly.JavaScript['run_cmd'] = function (block) {
  var checkbox_valuable = block.getFieldValue('valuable') == 'TRUE';
  var value_cmd = Blockly.JavaScript.valueToCode(block, 'cmd', Blockly.JavaScript.ORDER_ATOMIC);
  if (checkbox_valuable == false) {
    return "";
  }
  var code = `runtime.runCmd(${value_cmd},env,asyncWait);\n`;
  return code;
};

Blockly.JavaScript['copy_dir'] = function (block) {
  var value_from = Blockly.JavaScript.valueToCode(block, 'from', Blockly.JavaScript.ORDER_ATOMIC);
  var value_to = Blockly.JavaScript.valueToCode(block, 'to', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `runtime.copyDir(${value_from},${value_to},asyncWait);\n`;
  return code;
};


Blockly.JavaScript['var_str'] = function (block) {
  var value_str = Blockly.JavaScript.valueToCode(block, 'str', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `runtime.replaceVar(env,${value_str})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['v_str'] = function (block) {
  var value_str = block.getFieldValue('str');
  var code = `runtime.replaceVar(env,'${value_str}')`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['save_file'] = function (block) {
  var value_content = Blockly.JavaScript.valueToCode(block, 'content', Blockly.JavaScript.ORDER_ATOMIC);
  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `runtime.saveFile(${value_file},${value_content},'utf-8',asyncWait);\n`;
  return code;
};

Blockly.JavaScript['play_sound'] = function (block) {
  var value_sound = Blockly.JavaScript.valueToCode(block, 'sound', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['result'] = function (block) {
  var code = 'asyncResult.result';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['json_result'] = function (block) {

  var code = 'JSON.stringify(asyncResult.result)';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['rm_file'] = function (block) {
  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['rm_dir'] = function (block) {
  var value_dir = Blockly.JavaScript.valueToCode(block, 'dir', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `runtime.rmdir(${value_dir},asyncWait);\n`;
  return code;
};

Blockly.JavaScript['run_job'] = function (block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `runtime.runFileByName(${value_name},env,asyncWait);\n`;
  return code;
};


//系统的不能用了
Blockly.JavaScript['text_print'] = function (block) {
  var msg = Blockly.JavaScript.valueToCode(block, 'TEXT',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return 'console.log(' + msg + ');\n';
};

Blockly.JavaScript['text_add'] = function (block) {
  var order = Blockly.JavaScript.ORDER_ADDITION;
  var value_a = Blockly.JavaScript.valueToCode(block, 'A', order);
  var value_b = Blockly.JavaScript.valueToCode(block, 'B', order);

  var code = '""+' + value_a + '+' + value_b;
  return [code, order]
};

