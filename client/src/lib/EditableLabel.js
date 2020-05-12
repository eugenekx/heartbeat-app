import React, { useState } from "react";
import PropTypes from "prop-types";

var ENTER_KEY_CODE = 13;
var DEFAULT_LABEL_PLACEHOLDER = "Click To Edit";

var EditableLabel = function EditableLabel(props) {
  var _useState = useState(false),
      isEditing = _useState[0],
      setEditing = _useState[1];

  var _useState2 = useState(props.value),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = useState(null),
      inputRef = _useState3[0],
      setInputRef = _useState3[1];

  var inputClassName = props.inputClassName,
      labelClassName = props.labelClassName,
      labelFontSize = props.labelFontSize,
      labelFontWeight = props.labelFontWeight,
      labelPlaceHolder = props.labelPlaceHolder,
      inputFontSize = props.inputFontSize,
      inputMaxLength = props.inputMaxLength,
      inputPlaceHolder = props.inputPlaceHolder,
      inputTabIndex = props.inputTabIndex,
      inputWidth = props.inputWidth,
      inputHeight = props.inputHeight,
      inputFontWeight = props.inputFontWeight,
      inputBorderWidth = props.inputBorderWidth,
      divClassName = props.divClassName;


  var isTextValueValid = function isTextValueValid() {
    return typeof value !== "undefined" && value.trim().length > 0;
  };

  var handleFocus = function handleFocus() {
    if (isEditing) {
      if (typeof props.onFocusOut === "function") {
        props.onFocusOut(value);
      }
    } else {
      if (typeof props.onFocus === "function") {
        props.onFocus(value);
      }
    }

    if (isTextValueValid()) {
      setEditing(function (prev) {
        return !prev;
      });
    } else {
      if (isEditing) {
        setEditing(props.emptyEdit || false);
      } else {
        setEditing(true);
      }
    }
  };

  var handleChange = function handleChange(e) {
    setValue(inputRef.value);
    props.onChange(e);
  };

  var handleKeyDown = function handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      handleEnterKey();
    }
  };

  var handleEnterKey = function handleEnterKey() {
    handleFocus();
  };

  if (isEditing) {
    return React.createElement(
      "div",
      { className: divClassName},
      React.createElement("input", {
        ref: setInputRef,
        value: value,
        onChange: handleChange,
        onBlur: handleFocus,
        onKeyDown: handleKeyDown,
        className: inputClassName,
        style: {
          fontSize: inputFontSize,
          maxLength: inputMaxLength,
          placeHolder: inputPlaceHolder,
          tabIndex: inputTabIndex,
          width: inputWidth,
          height: inputHeight,
          fontWeight: inputFontWeight,
          borderWidth: inputBorderWidth
        },
        autoFocus: true
      })
    );
  }

  var labelText = isTextValueValid() ? value : props.labelPlaceHolder || DEFAULT_LABEL_PLACEHOLDER;

  return React.createElement(
    "div",
    { className: divClassName },
    React.createElement(
      "label",
      { onClick: handleFocus, className: labelClassName, style: {
          fontSize: labelFontSize,
          fontWeight: labelFontWeight,
          placeHolder: labelPlaceHolder
        } },
      labelText
    )
  );
};

EditableLabel.propTypes = process.env.NODE_ENV !== "production" ? {
  value: PropTypes.string.isRequired,
  isEditing: PropTypes.bool,
  emptyEdit: PropTypes.bool,

  labelClassName: PropTypes.string,
  labelFontSize: PropTypes.string,
  labelFontWeight: PropTypes.string,
  labelPlaceHolder: PropTypes.string,

  inputMaxLength: PropTypes.number,
  inputPlaceHolder: PropTypes.string,
  inputTabIndex: PropTypes.number,
  inputWidth: PropTypes.string,
  inputHeight: PropTypes.string,
  inputFontSize: PropTypes.string,
  inputFontWeight: PropTypes.string,
  inputClassName: PropTypes.string,
  inputBorderWidth: PropTypes.string,

  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onFocusOut: PropTypes.func
} : {};

export default EditableLabel;