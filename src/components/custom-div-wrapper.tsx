import React from "react";

interface CustomDivWrapperProps {
  children: JSX.Element | JSX.Element[] | null | (JSX.Element | null)[];
  component?: any; //TODO try to change any for something better
  className?: string;
}

const CustomDivWrapper: React.FC<CustomDivWrapperProps> = ({
  children,
  component: Component,
  className,
}) => {
  return !!Component ? (
    <Component>{children}</Component>
  ) : (
    <div className={className}>{children}</div>
  );
};

export default CustomDivWrapper;
