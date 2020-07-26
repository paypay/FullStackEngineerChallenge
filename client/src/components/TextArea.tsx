import classNames from "classnames";
import React, { FC, HTMLProps, Ref } from "react";

type TextAreaProps = HTMLProps<HTMLTextAreaElement>;

export const TextArea: FC<TextAreaProps> = React.forwardRef(
  (
    { className = "", rows = 2, children, ...props },
    ref: Ref<HTMLTextAreaElement>
  ) => {
    const classes = classNames(
      "p-3 rounded bg-white border border-gray-400 outline-none",
      className,
      {
        "w-full": !className.includes("w-"),
        "opacity-50 bg-gray-200": props.disabled,
      }
    );
    return (
      <textarea rows={rows} {...props} className={classes} ref={ref}>
        {children}
      </textarea>
    );
  }
);
