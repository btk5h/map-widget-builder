import React from "react";
import ReactDatePicker from "react-datepicker";

export default function DatePicker(props) {
  const {
    selectedDate,
    onChange,
    isClearable = false,
    showPopperArrow = false,
    ...otherProps
  } = props;

  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={onChange}
      isClearable={isClearable}
      showPopperArrow={showPopperArrow}
      {...otherProps}
    />
  );
}
