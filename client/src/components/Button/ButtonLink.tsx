import classNames from "classnames";
import React, { AnchorHTMLAttributes, FC } from "react";

import { ButtonProps, sizes, variants } from "./Button";

type Props = ButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    ref?: React.Ref<HTMLAnchorElement>;
    disabled?: boolean;
  };

export const ButtonLink: FC<Props> = React.forwardRef(
  (
    { children, variant = "primary", size = "md", className, ...props },
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    const classes = classNames(
      "inline-block text-bold text-center border-0 no-underline pointer whitespace-no-wrap",
      variants[variant],
      sizes[size],
      className,
      {
        "opacity-50 text-white cursor-not-allowed pointer-events-none":
          props.disabled,
      }
    );

    return (
      <a {...props} className={classes} ref={ref}>
        {children}
      </a>
    );
  }
);

ButtonLink.displayName = "ButtonLink";
