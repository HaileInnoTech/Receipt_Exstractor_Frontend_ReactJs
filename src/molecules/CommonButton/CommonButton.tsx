import React from "react";
import "./CommonButton.css";

interface CommonButtonProps {
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  title: string;
  onClick?: () => void;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  disabled = false,
  backgroundColor = "blue",
  textColor = "white",
  title,
  onClick,
}) => {
  return (
    <button
      className="common-button"
      disabled={disabled}
      style={{ backgroundColor, color: textColor }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default CommonButton;
