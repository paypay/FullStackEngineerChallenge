import classNames from "classnames";
import React, { FC } from "react";

import styles from "./FormGroup.module.scss";

interface FieldError {
  message?: string;
}

interface Props {
  labelFor?: string;
  label?: string;
  position?: "vertical" | "horizontal";
  displayError?: boolean;
  error?: string | FieldError;
  className?: string;
}

export const FormGroup: FC<Props> = ({
  labelFor,
  label,
  error,
  displayError = true,
  className = "",
  position = "vertical",
  children,
}) => {
  const errorMessage = error
    ? typeof error === "string"
      ? error
      : error.message
    : undefined;

  const classes = classNames("block w-full", className, {
    [styles.errors]: !!error,
  });

  const positionClasses = classNames("block", {
    "grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-0": position === "horizontal",
  });

  return (
    <div className={classes}>
      <div className={positionClasses}>
        {label && (
          <label htmlFor={labelFor} className="text-base grid-en">
            {label}
          </label>
        )}
        {children}
      </div>

      {displayError && errorMessage && (
        <div role="alert" className="text-sm text-red-500 mt-2">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
