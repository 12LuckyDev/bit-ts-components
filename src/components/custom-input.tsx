import { FC } from "react";
import CustomInputBase from "./custom-input-base";
import CustomInputBaseProps from "./props-interfaces/custom-input-base-props";
import CustomLabel from "./custom-label";
import CustomWithLabelProps from "./props-interfaces/custom-with-label-props";
import CustomLabelProps from "./props-interfaces/custom-label-props";

interface CustomInputProps extends CustomInputBaseProps, CustomWithLabelProps {}

const CustomInput: FC<CustomInputProps> = ({
  labelText,
  labelClassName,
  labelTextClassName,
  labelComponent,
  labelTextComponent,
  ...baseInputProps
}) => {
  const input = <CustomInputBase {...baseInputProps} />;

  if (!labelText) {
    return input;
  }

  const labelProps: CustomLabelProps = {
    labelText,
    labelClassName,
    labelTextClassName,
    labelComponent,
    labelTextComponent,
  };

  return <CustomLabel {...labelProps}>{input}</CustomLabel>;
};

export default CustomInput;
