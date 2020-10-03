import React from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
} & React.HTMLAttributes<HTMLButtonElement>;

const IconButton: React.FC<Props> = (props) => {
  const { icon: Icon, className, ...otherProps } = props;
  return (
    <button
      title="Change color"
      {...otherProps}
      className={"h-8 cursor-pointer mx-2 " + className}
    >
      <Icon className="h-full w-full" />
    </button>
  );
};

export default IconButton;
