import { Trans } from "@lingui/macro";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Link from "next/link";
import Router from "next/router";
import React, { FC, Fragment, useState } from "react";

import { Avatar, Loading } from "../../../..";
import { useAuth } from "../../../../../contexts/AuthContext";
import { UserType } from "../../../../../graphql/types";
import { getLocale } from "../../../../../helpers/getLocale";

export const AuthMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user, logout, loading } = useAuth();

  if (!user) {
    return <Fragment />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <button
        aria-controls="auth-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <div className="flex items-center">
          <Avatar size="xs" src={user.avatar} alt={user.firstName} />
          <span className="ml-2 font-medium text-lg text-gray-700">
            {user.lastName}
          </span>
          <ExpandMoreIcon />
        </div>
      </button>
      <Menu
        id="auth-menu"
        anchorEl={anchorEl}
        variant="menu"
        PopoverClasses={{ paper: "w-48 mt-16" }}
        className="text-xl"
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user.userType === UserType.Admin && (
          <MenuItem selected={Router.pathname.includes("admin/employees")}>
            <Link
              href="/[locale]/admin/employees"
              as={`/${getLocale()}/admin/employees`}
            >
              <a aria-disabled={true}>
                <Trans id="auth.menu.employees">Employees</Trans>
              </a>
            </Link>
          </MenuItem>
        )}
        <MenuItem disabled={true}>
          <Link href="#" as="#">
            <a>
              <Trans id="auth.menu.reviews">Reviews</Trans>
            </a>
          </Link>
        </MenuItem>
        <li role="separator" className="my-3 border-b border-gray-300" />
        <MenuItem onClick={logout}>
          <Trans id="auth.menu.logout">Logout</Trans>
        </MenuItem>
      </Menu>
    </div>
  );
};
