import { Modal as MaterialModal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import classNames from "classnames";
import { CoercedVariableValues } from "graphql/execution/values";
import Router from "next/router";
import React, { FC } from "react";

import { Loading } from ".";
import { getCurrentLocationParams } from "../helpers/getRoutePath";

export const handleClose = () => {
  Router.push(`${Router.route}${getCurrentLocationParams()}`, Router.asPath, {
    shallow: true,
  });
};

export interface ModalProps {
  closeable?: boolean;
  loading?: boolean;
  size?: "xl" | "md";
  className?: string;
  refetchVariables?: CoercedVariableValues["coerced"];
}

export const Modal: FC<ModalProps> = ({
  size = "xl",
  className,
  children,
  loading,
  closeable = true,
  ...props
}) => {
  const classes = classNames(
    "w-full bg-white shadow-xl px-8 py-6 rounded-lg relative m-auto outline-none",
    {
      "h-auto sm:max-w-screen-lg md:mx-4 xl-mx-0": size === "xl",
      "sm:max-w-lg mx-4": size === "md",
    },
    className
  );

  return (
    <div>
      <MaterialModal
        {...props}
        open={true}
        className="flex items-center justify-center overflow-y-scroll m-auto md:py-10"
        onClose={() => closeable && handleClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
      >
        <Fade in={true}>
          <div className={classes}>
            {size === "xl" && !loading && (
              <button
                className="absolute right-0 mr-8 py-1"
                onClick={handleClose}
              >
                <CloseIcon />
              </button>
            )}
            <div className="bg-white">
              {loading && <Loading />}
              {!loading && children}
            </div>
          </div>
        </Fade>
      </MaterialModal>
    </div>
  );
};
