import React from "react";

interface CustomButtonProps {
  onClick: (name?: string) => void;
  name?: string;
  text?: string;
  type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  name,
  text,
  type = "button",
}) => {
  if (type === "button") {
    const onClickHandler = () => {
      if (typeof onClick === "function") {
        onClick(name);
      }
    };

    return (
      <button type={type} onClick={onClickHandler}>
        {text}
      </button>
    );
  }

  return <button type={type}>{text}</button>;
};

export default CustomButton;
