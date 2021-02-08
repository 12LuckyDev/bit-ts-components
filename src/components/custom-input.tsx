import { ChangeEvent, FC } from "react";

interface CustomInputProps {
  value: string;
  onChange: (value: string, name?: string) => void;
  name?: string;
  labelText?: string;
  type?: string;
  labelClassName?: string;
  labelComponent?: any; //TODO try to change any for something better
  inputClassName?: string;
  inputComponent?: any; //TODO try to change any for something better
}

const CustomInput: FC<CustomInputProps> = ({
  value,
  onChange,
  name,
  labelText,
  type = "text",
  labelClassName,
  inputClassName,
  labelComponent: LabelComponent,
  inputComponent: InputComponent,
}) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === "function") {
      onChange(e.target.value, name);
    }
  };

  const input = !!InputComponent ? (
    <InputComponent type={type} value={value} onChange={onChangeHandler} />
  ) : (
    <input
      className={inputClassName}
      type={type}
      value={value}
      onChange={onChangeHandler}
    />
  );

  if (!!LabelComponent) {
    return !!labelText ? (
      <LabelComponent>
        {labelText} {input}
      </LabelComponent>
    ) : (
      input
    );
  }

  return !!labelText ? (
    <label className={labelClassName}>
      {labelText} {input}
    </label>
  ) : (
    input
  );
};

export default CustomInput;
