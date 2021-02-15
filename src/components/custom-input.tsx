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
  labelTextClassName?: string;
  labelTextComponent?: any; //TODO try to change any for something better
}

const CustomInput: FC<CustomInputProps> = ({
  value,
  onChange,
  name,
  labelText,
  type = "text",
  labelClassName,
  inputClassName,
  labelTextClassName,
  labelComponent: LabelComponent,
  inputComponent: InputComponent,
  labelTextComponent: LabelTextComponent,
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

  const labelTextElement = !!LabelTextComponent ? (
    <LabelTextComponent>{labelText}</LabelTextComponent>
  ) : !!labelTextClassName ? (
    <span className={labelTextClassName}>{labelText}</span>
  ) : (
    labelText
  );

  if (!!LabelComponent) {
    return !!labelText ? (
      <LabelComponent>
        {labelTextElement}
        {input}
      </LabelComponent>
    ) : (
      input
    );
  }

  return !!labelText ? (
    <label className={labelClassName}>
      {labelTextElement}
      {input}
    </label>
  ) : (
    input
  );
};

export default CustomInput;
