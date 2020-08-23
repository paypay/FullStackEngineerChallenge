import classNames from "classnames";
import { FC, LiHTMLAttributes, useEffect, useRef } from "react";
import scrollIntoView from "scroll-into-view-if-needed";

export interface OptionProps extends LiHTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
  selected?: boolean;
}

export const Option: FC<OptionProps> = ({
  disabled,
  className,
  children,
  selected,
  ...props
}) => {
  const classes = classNames(
    "py-2 cursor-pointer hover:bg-gray-200",
    { "bg-gray-200": selected, "pointer-events-none opacity-50": disabled },
    className
  );

  const ref = useRef<HTMLLIElement>(null);

  // Scroll to selected option
  useEffect(() => {
    if (selected && ref?.current) {
      scrollIntoView(ref.current, {
        behavior: "smooth",
        scrollMode: "if-needed",
        boundary: ref.current.parentElement,
      });
    }
  }, [selected]);

  return (
    <li {...props} ref={ref} aria-selected={selected} className={classes}>
      {children}
    </li>
  );
};
