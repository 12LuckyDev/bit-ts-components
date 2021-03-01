import React, { useRef, useState } from "react";
import CustomInputBase from "./custom-input-base";
import CustomButton from "./custom-button";
import { isFunc } from "@12luckydev/utils";
import CustomWithLabelProps from "./props-interfaces/custom-with-label-props";
import CustomDivWrapper from "./custom-div-wrapper";
import CustomLabel from "./custom-label";

type valueType = number | null;

interface CustomNumberInputProps extends CustomWithLabelProps {
  value: valueType;
  onChange: (value: valueType, name?: string) => void;
  name: string;
  buttonsComponent?: any; //TODO try to change any for something better
  buttonsClassName?: string;
  inputWrapperComponent?: any; //TODO try to change any for something better
  inputWrapperClassName?: string;
  valueType?: "string" | "number";
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

/**
 * Checks if value is valid to display in input (can't be NaN but '-' will pass)
 * @param value string value from input change event
 */
const valueValidator = (value: string | null, precision?: number): boolean => {
  if (!isNaN(Number(value)) || value === "-") {
    if (precision !== undefined) {
      const valuePrecision = getValuePrecision(value);
      return valuePrecision === null ? true : valuePrecision <= precision;
    }
    return true;
  }
  return false;
};

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  buttonsComponent,
  buttonsClassName,
  inputWrapperComponent,
  inputWrapperClassName,
  name,
  value,
  onChange,
  valueType = "number",
  step = 1,
  precision = 2,
  labelText,
  ...labelProps
}) => {
  const [localValue, setLocalValue] = useState<{ v: string }>({ v: "" });
  const useLocalValue = useRef<boolean>(false);

  const onClick = (action: string | undefined) => {
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

      onChangeWrapper(newValue, localValue.v, false);
    }
  };

  const onChangeHandler = (newValue: string) => {
    if (!valueValidator(newValue, precision)) {
      console.log("UNVALID!", newValue);
      // UNVALID STRING!! VALUE STAYS THE SAME, DON'T CHANGE STRING IN INPUT
      onChangeWrapper(value, localValue.v, true);
    } else {
      onChangeWrapper(parseValue(newValue), newValue, valueChecker(newValue));
    }
  };

  const onChangeWrapper = (
    newValue: valueType,
    newLocalValue: string,
    useLocal: boolean
  ) => {
    useLocalValue.current = useLocal;

    if (newLocalValue !== localValue.v) {
      console.log("LOCAL CHANGE", newLocalValue);
      setLocalValue({ v: newLocalValue });
    }

    if (isFunc(onChange)) {
      if ((newValue === null || !isNaN(newValue)) && newValue !== value) {
        console.log("ONCHANGE", newValue);
        onChange(newValue, name);
      }
    }
  };

  const baseElements = (
    <CustomDivWrapper
      component={inputWrapperComponent}
      className={inputWrapperClassName}
    >
      <CustomButton
        className={buttonsClassName}
        component={buttonsComponent}
        onClick={onClick}
        name="-"
        text="-"
      />
      <CustomInputBase
        name={name}
        value={
          useLocalValue.current
            ? localValue.v
            : value !== null
            ? value.toString()
            : ""
        }
        onChange={onChangeHandler}
      />
      <CustomButton
        className={buttonsClassName}
        component={buttonsComponent}
        onClick={onClick}
        name="+"
        text="+"
      />
    </CustomDivWrapper>
  );

  return labelText ? (
    <CustomLabel labelText={labelText} {...labelProps}>
      {baseElements}
    </CustomLabel>
  ) : (
    baseElements
  );
};

export default CustomNumberInput;
