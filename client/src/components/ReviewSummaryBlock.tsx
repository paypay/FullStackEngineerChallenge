import { i18n } from "@lingui/core";
import { defineMessage } from "@lingui/macro";
import React, { FC, Fragment } from "react";

import { FormGroup, Rating } from ".";
import { Review } from "../graphql/types";

export interface ReviewSummaryBlockProps {
  review?: Partial<Omit<Review, "__typename">> | null;
}

export const ReviewSummaryBlock: FC<ReviewSummaryBlockProps> = ({ review }) => {
  if (!review?.rating) {
    return <Fragment />;
  }
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-6">
      <FormGroup
        className="text-gray-700 text-lg"
        label={i18n._(
          defineMessage({
            id: "auth.review.modal.view.attitude",
            message: "Attitude",
          })
        )}
        position="horizontal"
      >
        <Rating showDetails={false} rate={review?.attitude} />
      </FormGroup>

      <FormGroup
        className="text-gray-700 text-lg"
        label={i18n._(
          defineMessage({
            id: "auth.review.modal.view.productivity",
            message: "Productivity",
          })
        )}
        position="horizontal"
      >
        <Rating showDetails={false} rate={review?.productivity} />
      </FormGroup>

      <FormGroup
        className="text-gray-700 text-lg"
        label={i18n._(
          defineMessage({
            id: "auth.review.modal.view.communication",
            message: "Communication",
          })
        )}
        position="horizontal"
      >
        <Rating showDetails={false} rate={review?.communication} />
      </FormGroup>

      <FormGroup
        className="text-gray-700 text-lg"
        label={i18n._(
          defineMessage({
            id: "auth.review.modal.view.initiative",
            message: "Initiative",
          })
        )}
        position="horizontal"
      >
        <Rating showDetails={false} rate={review?.initiative} />
      </FormGroup>

      <FormGroup
        className="text-gray-700 text-lg"
        label={i18n._(
          defineMessage({
            id: "auth.review.modal.view.growth",
            message: "Growth",
          })
        )}
        position="horizontal"
      >
        <Rating showDetails={false} rate={review?.growth} />
      </FormGroup>

      <FormGroup
        className="text-gray-700 text-lg"
        label={i18n._(
          defineMessage({
            id: "auth.review.modal.view.innovation",
            message: "Innovation",
          })
        )}
        position="horizontal"
      >
        <Rating showDetails={false} rate={review?.innovation} />
      </FormGroup>

      <FormGroup
        className="text-gray-700 text-lg"
        label={i18n._(
          defineMessage({
            id: "auth.review.modal.view.dependability",
            message: "Dependability",
          })
        )}
        position="horizontal"
      >
        <Rating showDetails={false} rate={review?.dependability} />
      </FormGroup>
    </div>
  );
};
