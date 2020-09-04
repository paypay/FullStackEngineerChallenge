import React from "react";
import { ButtonBlock, SpinnerButtonSpinner, HiddenChildren, } from "./styledComponents"
import { ReactComponent as SpinnerIcon } from "./assets/circle-notch-solid.svg";

const SpinnerButton: React.FunctionComponent<any> = ({ children, spinning, props }) => {
  return (
    <ButtonBlock style={{ position: `relative` }} {...props}>
      <SpinnerButtonSpinner spinning={spinning}>
        <SpinnerIcon style={{ color: `inherit` }} />
      </SpinnerButtonSpinner>
      <HiddenChildren spinning={spinning}>{children}</HiddenChildren>
    </ButtonBlock>
  );
}
export default SpinnerButton

