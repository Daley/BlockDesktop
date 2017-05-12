function NativeHelper(interpreter) {
  this.interpreter = interpreter;
}

NativeHelper.prototype.interpreterValueToNative = function (value) {
  if (value.isPrimitive) {
    return value.data;
  } else {
    // determine if we create an array or an object
    var isArray = value.parent === this.interpreter.ARRAY;
    // value is an object, iterate properties
    var ret = isArray ? [] : {};
    for (var name in value.properties) {
      propValue = value.properties[name];
      propNativeValue = this.interpreterValueToNative(propValue);
      ret[name] = propNativeValue;
    }

    return ret;
  }
};

NativeHelper.prototype.nativeValueToInterpreter = function (value, containerObj) {

  var valueType = typeof value;
  if (valueType === 'number' ||
    valueType === 'string' ||
    valueType === 'boolean') {
    return this.interpreter.createPrimitive(value);
  } else if (valueType === 'undefined') {
    return this.UNDEFINED;
  } else if (valueType === 'function') {
    var applyObj = containerObj || window;
    return this.interpreter.createNativeFunction(
      this.createGenericNativeWrapper(applyObj, value));
  } else if (valueType === 'object') {
    var parent = Array.isArray(value) ? this.interpreter.ARRAY : this.interpreter.OBJECT;
    var ret = this.interpreter.createObject(parent);
    for (var name in value) {
      propValue = value[name];
      propInterpeterValue = this.nativeValueToInterpreter(propValue, value);
      this.interpreter.setProperty(ret, name, propInterpeterValue);

    }
    return ret;
  } else {
    throw new Error('Native to interpreter does not support type: ' + valueType);
  }
};

NativeHelper.prototype.createGenericNativeWrapper = function (obj, func) {
  var helper = this;
  return function () {
    var args = Array.prototype.slice.call(arguments, 0);
    
    // Convert args to underlying data
    var nativeArgs = args.map(function (arg) {
      // TODO: HACKY to put the conversion in a magical property name
      // Added to support async runner
      if (arg.customArgumentNativeConversion) {
        return arg.customArgumentNativeConversion();
      } //END HACK

      return helper.interpreterValueToNative(arg);
    });

    var ret = func.apply(obj, nativeArgs);
    return helper.nativeValueToInterpreter(ret);
  };
};