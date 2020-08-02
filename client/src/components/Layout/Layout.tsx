import classNames from "classnames";
import React, { FC } from "react";

import { Head } from "./components/Head";

import { Header } from "./components/Header";

export interface LayoutProps {
  title: string;
  description?: string;
  className?: string;
  autoLayout?: boolean;
}

export const Layout: FC<LayoutProps> = ({
  title,
  description,
  children,
  className,
  autoLayout = true,
}) => {
  const classes = classNames("min-h-32", className, {
    "px-4 md:px-8": !!autoLayout,
  });

  return (
    <>
      <Head title={title} description={description} />
      <Header />
      <main className={classes}>{children}</main>
      <footer />
    </>
  );
};

export default Layout;
