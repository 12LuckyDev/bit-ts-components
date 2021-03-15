import React, { useRef, useState } from "react";
import { isFunc } from "@12luckydev/utils";
import CustomWithLabelProps from "./props-interfaces/custom-with-label-props";
import CustomNumberInputComponent from "./custom-number-input-ui-component";
import CustomNumberInputComponentProps from "./props-interfaces/custom-number-input-ui-component-props";

type valueType = number | null;

// TODO
// -disable input (only use buttons) - props
// min/max

interface CustomNumberInputProps
  extends CustomWithLabelProps,
    CustomNumberInputComponentProps {
  value: valueType;
  onChange: (value: valueType, name?: string) => void;
  name: string;
  step?: number;
  precision?: number;
}

const isInt = (value: number | string): boolean => {
  return !value.toString().includes(".");
};

const parseValue = (value: string): valueType => {
  return value === "" ? null : Number(value);
};

/**
 * Checks if component should display localValue or props value
 * @param value string value from input change event
 */
const valueChecker = (value: valueType | string): boolean => {
  if (value === null) {
    return false;
  }
  const strValue = value.toString();
  const lastChar = strValue[strValue.length - 1];
  return (
    lastChar === "." || (!isInt(value) && lastChar === "0") || strValue === "-"
  );
};

/**
 * Extract precision from value
 * @param value string value from input change event
 */
const getValuePrecision = (value: string | number | null): number | null => {
  if (value === null) {
    return null;
  }

  const valueStr = value.toString();
  const index = valueStr.indexOf(".");
  if (index > -1) {
    return valueStr.length - index - 1;
  }
  return null;
};

const validateSaveInt = (value: number): boolean => {
  return !(value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER);
};

/**
 * Checks if value is valid to display in input (can't be NaN but '-' will pass)
 * @param value string value from input change event
 */
const valueValidator = (value: string | null, precision?: number): boolean => {
  const numberValue = Number(value);
  if (!isNaN(numberValue) || value === "-") {
    if (!validateSaveInt(numberValue)) {
      return false;
    }

    if (precision !== undefined) {
      const valuePrecision = getValuePrecision(value);
      return valuePrecision === null ? true : valuePrecision <= precision;
    }
    return true;
  }
  return false;
};

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  name,
  value,
  onChange,
  step = 1,
  precision,
  ...uiProps
}) => {
  const [localValue, setLocalValue] = useState<{ v: string }>({ v: "" });
  const useLocalValue = useRef<boolean>(false);

  const onChangeWrapper = (
    newValue: valueType,
    newLocalValue: string,
    useLocal: boolean
  ) => {
    useLocalValue.current = useLocal;

    if (newLocalValue !== localValue.v) {
      setLocalValue({ v: newLocalValue });
    }

    if (isFunc(onChange)) {
      if ((newValue === null || !isNaN(newValue)) && newValue !== value) {
        onChange(newValue, name);
      }
    }
  };

  const onClickHandler = (action: string | undefined) => {
    if (isFunc(onChange)) {
      const valuePrecision = getValuePrecision(value);

      const toPrecision = !precision
        ? !valuePrecision
          ? 0
          : valuePrecision
        : precision;

      const currentNumericValue = Number(value);
      const newValue =
        action === "+"
          ? Number((currentNumericValue + step).toFixed(toPrecision))
          : Number((currentNumericValue - step).toFixed(toPrecision));
      if (validateSaveInt(newValue)) {
        onChangeWrapper(newValue, localValue.v, false);
      }
    }
  };

  const onChangeHandler = (newValue: string) => {
    if (!valueValidator(newValue, precision)) {
      // UNVALID STRING!! VALUE STAYS THE SAME, DON'T CHANGE STRING IN INPUT
      onChangeWrapper(value, localValue.v, true);
    } else {
      onChangeWrapper(parseValue(newValue), newValue, valueChecker(newValue));
    }
  };

  const dispValue = useLocalValue.current
    ? localValue.v
    : value !== null
    ? value.toString()
    : "";

  return (
    <CustomNumberInputComponent
      onClick={onClickHandler}
      onChange={onChangeHandler}
      value={dispValue}
      {...uiProps}
    />
  );
};

export default CustomNumberInput;
