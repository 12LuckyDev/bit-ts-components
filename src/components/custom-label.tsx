import React from "react";
import CustomLabelProps from "./props-interfaces/custom-label-props";

const CustomLabel: React.FC<CustomLabelProps> = ({
  labelText,
  labelClassName,
  labelTextClassName,
  labelComponent: LabelComponent,
  labelTextComponent: LabelTextComponent,
  children,
}) => {
    
  const labelTextElement = !!LabelTextComponent ? (
    <LabelTextComponent>{labelText}</LabelTextComponent>
  ) : !!labelTextClassName ? (
    <span className={labelTextClassName}>{labelText}</span>
  ) : (
    labelText
  );

  if (!!LabelComponent) {
    return (
      <LabelComponent>
        {labelTextElement}
        {children}
      </LabelComponent>
    );
  }

  return (
    <label className={labelClassName}>
      {labelTextElement}
      {children}
    </label>
  );
};

export default CustomLabel;
