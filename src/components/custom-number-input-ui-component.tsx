import React from "react";
import CustomButton from "./custom-button";
import CustomDivWrapper from "./custom-div-wrapper";
import CustomInputBase from "./custom-input-base";
import CustomLabel from "./custom-label";
import CustomNumberInputComponentProps from "./props-interfaces/custom-number-input-ui-component-props";

interface CustomNumberInputWithMethodsProps
  extends CustomNumberInputComponentProps {
  onClick: (action: string | undefined) => void;
  onChange: (newValue: string) => void;
  value: string;
  inputComponent?: any;//TODO try to change any for something better
  inputClassName?: string;
}

const CustomNumberInputComponent: React.FC<CustomNumberInputWithMethodsProps> = ({
  onClick,
  onChange,
  value,
  displayType = "end",
  buttonsComponent,
  buttonsClassName,
  inputComponent,
  inputClassName,
  inputWrapperComponent,
  inputWrapperClassName,
  buttonsWrapperClassName,
  buttonsWrapperComponent,
  labelText,
  ...labelProps
}) => {
  const plusButton = (
    <CustomButton
      className={buttonsClassName}
      component={buttonsComponent}
      onClick={onClick}
      name="+"
      text="+"
      key="+"
    />
  );

  const minusButton = (
    <CustomButton
      className={buttonsClassName}
      component={buttonsComponent}
      onClick={onClick}
      name="-"
      text="-"
      key="-"
    />
  );

  const input = (
    <CustomInputBase
      value={value}
      onChange={onChange}
      inputClassName={inputClassName}
      inputComponent={inputComponent}
      key="input"
    />
  );

  const elements =
    displayType === "around"
      ? [minusButton, input, plusButton]
      : !!buttonsWrapperClassName || !!buttonsWrapperComponent
      ? [
          input,
          <CustomDivWrapper
            className={buttonsWrapperClassName}
            component={buttonsWrapperComponent}
            key="wrapper"
          >
            {minusButton}
            {plusButton}
          </CustomDivWrapper>,
        ]
      : [input, minusButton, plusButton];

  const baseElements = (
    <CustomDivWrapper
      component={inputWrapperComponent}
      className={inputWrapperClassName}
    >
      {elements}
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

export default CustomNumberInputComponent;
