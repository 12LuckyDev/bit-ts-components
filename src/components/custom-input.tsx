import React, { ChangeEvent } from "react";

interface CustomInputProps {
  value: string;
  onChange: (value: string, name?: string) => void;
  name?: string;
  labelText?: string;
  type?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
  name,
  labelText,
  type = "text",
}) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === "function") {
      onChange(e.target.value, name);
    }
  };

  const input = <input type={type} value={value} onChange={onChangeHandler} />;

  return !!labelText ? (
    <label>
      {labelText} {input}
    </label>
  ) : (
    input
  );
};

export default CustomInput;
