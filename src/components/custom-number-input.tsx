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
}

const valueChecker = (value: valueType | string): boolean => {
  if (value === null) {
    return false;
  }
  const strValue = value.toString();
  return strValue[strValue.length - 1] === "." || strValue === "-";
};

const valueValidator = (value: string | null): boolean =>
  !isNaN(Number(value)) || value === "-";

//TODO add precision for example 2 means you can have max 2 numbers after . -> 10.01 ok 10.001 no ok... use toFixed? 

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
  labelText,
  ...labelProps
}) => {
  const [localValue, setLocalValue] = useState<{ v: string }>({ v: "" });
  const useLocalValue = useRef<boolean>(valueChecker(value));

  const onClick = (action: string | undefined) => {
    if (isFunc(onChange)) {
      const currentNumericValue = Number(value) === NaN ? 0 : Number(value);
      if (action === "+") {
        onChange(currentNumericValue + step, name);
      } else {
        onChange(currentNumericValue - step, name);
      }
    }
  };

  const onChangeHandler = (newValue: string, name?: string) => {
    if (!valueValidator(newValue)) {
      useLocalValue.current = true;
      setLocalValue(localValue);
    } else if (isFunc(onChange)) {
      if (valueChecker(newValue)) {
        useLocalValue.current = true;
        setLocalValue({ v: newValue });
      } else {
        useLocalValue.current = false;
        onChange(newValue !== "" ? Number(newValue) : null, name);
        if (newValue === value?.toString()) {
          setLocalValue({ v: newValue });
        }
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
