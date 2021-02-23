import { ChangeEvent, FC } from "react";
import CustomInputBaseProps from "./props-interfaces/custom-input-base-props";

const CustomInputBase: FC<CustomInputBaseProps> = ({
  value,
  onChange,
  name,
  type = "text",
  inputClassName,
  inputComponent: InputComponent,
}) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === "function") {
      onChange(e.target.value, name);
    }
  };

  return !!InputComponent ? (
    <InputComponent type={type} value={value} onChange={onChangeHandler} />
  ) : (
    <input
      className={inputClassName}
      type={type}
      value={value}
      onChange={onChangeHandler}
    />
  );
};

export default CustomInputBase;
