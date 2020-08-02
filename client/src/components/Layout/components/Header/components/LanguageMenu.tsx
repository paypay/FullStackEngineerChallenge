import { Menu, MenuItem } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TranslateIcon from "@material-ui/icons/Translate";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";

import { COOKIE_LANGUAGE } from "../../../../../constants";
import cookies from "../../../../../helpers/cookies";
import localeDisplayNames from "../../../../../locales/localeDisplayNames.json";
import { i18n } from "@lingui/core";

export const LanguageMenu: FC = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLanguageClick = (lang: string) => {
    cookies().set(COOKIE_LANGUAGE, lang);
    router.replace(router.pathname.replace("/[lang]", `/${lang}`));
  };
  return (
    <div>
      <button
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <div className="flex items-center text-gray-700 text-lg">
          <TranslateIcon />
          <span className="font-medium ml-2 mr-1 text-sm uppercase">
            {localeDisplayNames[i18n.locale]}
          </span>
          <ExpandMoreIcon />
        </div>
      </button>

      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        variant="menu"
        PopoverClasses={{ paper: "w-32 mt-12" }}
        className="text-xl"
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.entries(localeDisplayNames).map(([id, name]) => (
          <MenuItem
            key={id}
            onClick={() => onLanguageClick(id)}
            selected={router.asPath.includes(`/${id}/`)}
          >
            <span>{name}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
