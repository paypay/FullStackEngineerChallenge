import { CircularProgress } from "@material-ui/core";
import React, { FC } from "react";

export interface Loading {}

export const Loading: FC<Loading> = () => {
  return (
    <div className="w-full text-center">
      <CircularProgress color="secondary" />
    </div>
  );
};
