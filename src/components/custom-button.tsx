import { FC } from "react";

interface CustomButtonProps {
  onClick: (name?: string) => void;
  name?: string;
  text?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  component?: any; //TODO try to change any for something better
}

const CustomButton: FC<CustomButtonProps> = ({
  onClick,
  name,
  text,
  type = "button",
  className,
  component: Component,
}) => {
  if (type === "button") {
    const onClickHandler = () => {
      if (typeof onClick === "function") {
        onClick(name);
      }
    };

    return !!Component ? (
      <Component type={type} onClick={onClickHandler}>
        {text}
      </Component>
    ) : (
      <button className={className} type={type} onClick={onClickHandler}>
        {text}
      </button>
    );
  }

  return !!Component ? (
    <Component type={type}>
      {text}
    </Component>
  ) : (
    <button className={className} type={type}>
      {text}
    </button>
  );
};

export default CustomButton;
