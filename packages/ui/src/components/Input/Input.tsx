import React from "react";

type InputProps = {
  type?: "text" | "number" | "url";
};

export const Input = ({ type = "text", ...props }: InputProps) => {
  return <input type={type} {...props} />;
};
