import React from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ButtonLink, SimpleLink } from "./styledComponents";
const AuthMetaLinks: React.FC<any> = (props: any) => {
  const path = props.location.pathname.replace("/", "");
  const basePath = path.split("/")[0];
  const isSignUp = props.location.pathname === "/signup" || props.location.pathname.includes("/redeem-token");
  const isLogin = props.location.pathname === ("/login");
  const isResetPassword = ["reset-password", "redeem-reset-password"].filter((i) => basePath.indexOf(i) !== -1).length > 0;
  return (
    <div style={{ textAlign: `center`, margin: `1em 0` }}>
      <div style={{ marginTop: `1em` }}>
        {!isLogin && !isSignUp && (
          <ButtonLink
            exact={true}
            activeClassName="active"
            to="/login"
            as={NavLink}
          >
            Login
          </ButtonLink>
        )}
        {!isResetPassword && (
          <ButtonLink
            as={NavLink}
            exact={true}
            activeClassName="active"
            to="/reset-password"
          >
            Forgot password?
          </ButtonLink>
        )}
      </div>
      <div style={{ marginTop: `.5em` }}>
        <SimpleLink
          as={NavLink}
          exact={true}
          style={{ marginRight: "1em" }}
          to="/pages/legal"
        >
          Legal
      </SimpleLink>
        <SimpleLink
          as={NavLink}
          to="/pages/privacy"
        >
          Privacy
      </SimpleLink>
      </div>
    </div>
  );
};

export default withRouter(AuthMetaLinks);
