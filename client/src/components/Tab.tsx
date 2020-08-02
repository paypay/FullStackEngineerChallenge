import React, { FC, HTMLAttributes, ButtonHTMLAttributes } from "react";
import classNames from "classnames";

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

const Tab: FC<TabProps> = ({
  children,
  className,
  selected = false,
  ...props
}) => {
  const classes = classNames(
    "border border-gray-400 py-1 px-6 w-40 h-full font-medium",
    {
      "border-b-0 bg-white cursor-default pointer-events-none": selected,
      "bg-gray-400 hover:bg-gray-500": !selected,
    },
    className
  );
  return (
    <div>
      <button
        {...props}
        role="tab"
        aria-selected={selected}
        className={classes}
      >
        {children}
      </button>
    </div>
  );
};

export interface TabsComponents {
  Tab: typeof Tab;
}

export const Tabs: FC<HTMLAttributes<HTMLDivElement>> & TabsComponents = ({
  className,
  children,
  ...props
}) => {
  const classes = classNames(
    "grid gap-4 grid-flow-col col-span-1 grid-auto-col",
    className
  );
  return (
    <>
      <div className="w-full flex justify-center">
        <div {...props} role="tablist" className={classes}>
          {children}
        </div>
      </div>
      <div className="border-t border-gray-400 -m-px" />
    </>
  );
};

Tabs.Tab = Tab;
