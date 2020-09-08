import React from "react";
import { Button, SpinnerButtonSpinner, HiddenChildren, } from "./styledComponents"
import { ReactComponent as SpinnerIcon } from "./assets/circle-notch-solid.svg";

const SpinnerButton: React.FunctionComponent<any> = ({ children, spinning, onclick, ...props }) => {
  return (
    <Button style={{ position: `relative` }} {...props}>
      <SpinnerButtonSpinner spinning={spinning}>
        <SpinnerIcon style={{ color: `inherit` }} />
      </SpinnerButtonSpinner>
      <HiddenChildren spinning={spinning}>{children}</HiddenChildren>
    </Button>
  );
}
export default SpinnerButton

