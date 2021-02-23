interface CustomInputBaseProps {
  value: string;
  onChange: (value: string, name?: string) => void;
  name?: string;
  type?: string;
  inputClassName?: string;
  inputComponent?: any; //TODO try to change any for something better
}

export default CustomInputBaseProps;
