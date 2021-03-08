import CustomWithLabelProps from "./custom-with-label-props";

interface CustomNumberInputComponentProps extends CustomWithLabelProps {
  buttonsComponent?: any; //TODO try to change any for something better
  buttonsClassName?: string;
  inputComponent?: any;//TODO try to change any for something better
  inputClassName?: string;
  inputWrapperComponent?: any; //TODO try to change any for something better
  inputWrapperClassName?: string;
  buttonsWrapperClassName?: string;
  buttonsWrapperComponent?: any; //TODO try to change any for something better
  displayType?: "around" | "end";
}

export default CustomNumberInputComponentProps;
