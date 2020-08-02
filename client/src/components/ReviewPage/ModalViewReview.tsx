import { i18n } from "@lingui/core";
import { defineMessage, Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import React, { FC } from "react";

import {
  Button,
  FormGroup,
  handleClose,
  Modal,
  ModalProps,
  ReviewSummaryBlock,
  UserHeader,
} from "..";
import { useAssignmentQuery } from "../../graphql/types";

export const ModalViewReview: FC<ModalProps> = ({
  refetchVariables,
  ...props
}) => {
  const router = useRouter();

  const assignmentId = Number(router.query.view);

  const { data, loading: isFetchingAssignment } = useAssignmentQuery({
    variables: { id: assignmentId },
  });

  const assignment = data?.assignment;

  return (
    <Modal
      {...props}
      aria-labelledby="view-review-modal-title"
      loading={isFetchingAssignment}
    >
      <>
        <h2
          id="view-review-modal-title"
          className="text-xl md:text-2xl mb-5 font-bold text-gray-900"
        >
          <Trans id="auth.review.modal.view.title">
            Your Review on {assignment?.reviewee.firstName}'s performance
          </Trans>
        </h2>
        <UserHeader
          user={assignment?.reviewee}
          rating={assignment?.review?.rating}
        />

        <div className="border-b border-gray-300 my-8 w-full" />

        <ReviewSummaryBlock review={assignment?.review} />
        <div className="border-b border-gray-300 my-8 w-full" />

        <FormGroup
          label={i18n._(
            defineMessage({
              id: "auth.review.modal.view.comments",
              message: "Comments",
            })
          )}
          className="mt-4"
        >
          <p className="my-4 text-gray-600">{assignment?.review?.comment}</p>
        </FormGroup>

        <span className="mt-8 flex justify-end rounded-md sm:mt-0 sm:w-auto">
          <Button
            variant="default"
            className="w-auto"
            type="button"
            onClick={() => handleClose()}
          >
            <Trans id="modal.close">Close</Trans>
          </Button>
        </span>
      </>
    </Modal>
  );
};
