import classNames from "classnames";
import React, { FC } from "react";

import styles from "./FormGroup.module.scss";

interface FieldError {
  message?: string;
}

interface Props {
  labelFor?: string;
  label?: string;
  error?: string | FieldError;
  className?: string;
}

export const FormGroup: FC<Props> = ({
  labelFor,
  label,
  error,
  className = "",
  children,
}) => {
  const errorMessage = error
    ? typeof error === "string"
      ? error
      : error.message
    : undefined;

  const classes = classNames("block w-full mb-6", className, {
    [styles.errors]: !!error,
  });

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={labelFor} className="text-base mb-2">
          {label}
        </label>
      )}
      {children}
      {errorMessage && (
        <div role="alert" className="text-sm text-red-500 mt-2">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
