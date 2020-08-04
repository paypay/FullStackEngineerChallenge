import { Trans } from "@lingui/macro";
import classNames from "classnames";
import React, { FC, HTMLAttributes, HTMLProps, useState } from "react";

interface BubbleRatingProps extends HTMLAttributes<HTMLDivElement> {
  filled?: boolean;
}
const BubbleRating: FC<BubbleRatingProps> = ({ filled, ...props }) => {
  const classes = classNames(
    "flex-shrink-0 flex-grow-0 cursor-pointer rounded-full w-6 h-6 mr-2 bg-gray-500 flex items-center justify-center hover:bg-red-500",
    { "bg-red-500": filled }
  );

  const innerClasses = classNames(
    "bg-white w-4 h-4 rounded-full hover:bg-red-500",
    { "bg-red-500": filled }
  );
  return (
    <div className={classes} {...props}>
      <div className={innerClasses} />
    </div>
  );
};

export type InputRatingProps = HTMLProps<HTMLInputElement> & {
  defaultValue?: number;
};

export const InputRating: FC<InputRatingProps> = React.forwardRef(
  ({ defaultValue, ...props }, ref) => {
    const [focusValue, setFocusValue] = useState(0);
    const [value, setValue] = useState(defaultValue);

    const classes = classNames("flex items-center", {
      "opacity-50 cursor-not-allowed pointer-events-none": props.disabled,
    });

    const ratingValue = focusValue > 0 ? focusValue : value || 0;

    return (
      <>
        <div className="flex items-center row-span-3">
          <div className={classes} onMouseLeave={() => setFocusValue(0)}>
            {Array.from(Array(5), (_, index) => (
              <BubbleRating
                key={index}
                onClick={() => setValue(index + 1)}
                filled={ratingValue > index}
                onMouseEnter={() => setFocusValue(index + 1)}
              />
            ))}
          </div>
          <div className="hidden lg:block ml-4 text-base whitespace-no-wrap text-red-500 font-medium">
            {ratingValue === 1 && <Trans id="rating.terrible">Terrible</Trans>}
            {ratingValue === 2 && <Trans id="rating.poor">Poor</Trans>}
            {ratingValue === 3 && <Trans id="rating.average">Average</Trans>}
            {ratingValue === 4 && <Trans id="rating.veryGood">Very Good</Trans>}
            {ratingValue === 5 && (
              <Trans id="rating.excellent">Excellent</Trans>
            )}
          </div>
        </div>

        <input
          defaultValue={value}
          type="number"
          readOnly
          ref={ref}
          {...props}
          className="hidden"
        />
      </>
    );
  }
);
