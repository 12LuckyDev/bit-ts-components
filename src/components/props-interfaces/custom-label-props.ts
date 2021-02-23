import CustomWithLabelBaseProps from "./custom-with-label-base-props";

interface CustomLabelProps extends CustomWithLabelBaseProps {
  labelText: string;
  children?: JSX.Element | null;
}

export default CustomLabelProps;
