import { i18n } from "@lingui/core";
import { defineMessage } from "@lingui/macro";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import classNames from "classnames";
import React, { FC, Fragment } from "react";

interface RatingProps {
  rate?: number;
  showDetails?: boolean;
  className?: string;
}

interface StarProps {
  icon: "starHalf" | "star";
  className: string;
}

const Icon: FC<{ className: string; variant: "starHalf" | "star" }> = ({
  variant,
  ...props
}) => {
  if (variant === "starHalf") {
    return <StarHalfIcon {...props} />;
  }

  return <StarIcon {...props} />;
};

const getStars = (rate: number, count: number, starIndex = 1): StarProps[] => {
  if (starIndex > count) {
    return [];
  }
  const isFullStar = starIndex <= Math.round(rate);
  const isHalfStar = Math.round(rate) === starIndex && rate % 1 >= 0.5;

  const variant: StarProps = {
    icon: isHalfStar ? "starHalf" : "star",
    className: isFullStar ? "text-red-500" : "text-gray-500",
  };

  return [variant, ...getStars(rate, count, ++starIndex)];
};

export const Rating: FC<RatingProps> = ({
  rate = 0,
  className = "",
  showDetails = true,
}) => {
  const classes = classNames(
    `truncate inline-block align-middle text-sm`,
    className
  );

  // Render and empty fragment when there is no rate value
  if (rate === 0) {
    return <Fragment />;
  }

  const stars = getStars(rate, 5);

  return (
    <div
      className={classes}
      role="img"
      aria-label={i18n._(
        defineMessage({
          id: "rating.aria_label",
          message: "Rating {rate} out of 5",
        }),
        { rate }
      )}
    >
      {stars.map((star, index) => (
        <Icon
          key={`rating-${index}`}
          variant={star.icon}
          aria-hidden="true"
          className={star.className}
        />
      ))}

      {showDetails && (
        <span
          aria-hidden="true"
          className="inline-block align-middle font-medium ml-2"
        >
          {rate.toFixed(2)}
        </span>
      )}
    </div>
  );
};
