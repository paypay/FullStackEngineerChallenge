import React, { ReactElement } from "react";
import { Spinner } from "@blueprintjs/core";

interface Props {
  isLoading: boolean;
  children: () => ReactElement;
}
export default function Loading({ isLoading, children }: Props) {
  return isLoading ? <Spinner /> : children();
}
