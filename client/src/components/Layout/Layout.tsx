import classNames from "classnames";
import React, { FC } from "react";

import { Head } from "./components/Head";

export interface LayoutProps {
  title: string;
  description?: string;
  className?: string;
}

export const Layout: FC<LayoutProps> = ({
  title,
  description,
  children,
  className,
}) => {
  const classes = classNames("py-16 px-4 md:px-8", className);
  return (
    <>
      <Head title={title} description={description} />
      <header />
      <main className={classes}>{children}</main>
      <footer />
    </>
  );
};

export default Layout;
