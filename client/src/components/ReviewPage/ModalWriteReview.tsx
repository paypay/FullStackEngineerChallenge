import { i18n } from "@lingui/core";
import { defineMessage, Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { FC } from "react";

import {
  MeAssignmentsDocument,
  useAssignmentQuery,
  useCreateReviewMutation,
} from "../../graphql/types";
import { formatApiErrors } from "../../helpers/formatApiErrors";
import { handleClose, Modal, ModalProps } from "../Modal";
import { UserHeader } from "../UserHeader";
import { ReviewForm } from "./ReviewForm";

export const ModalWriteReview: FC<ModalProps> = ({
  refetchVariables,
  ...props
}) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const assignmentId = Number(router.query.create);

  const { data, loading: isFetchingAssignment } = useAssignmentQuery({
    variables: { id: assignmentId },
  });

  const [createReviewMutation, { loading }] = useCreateReviewMutation();

  const assignment = data?.assignment;

  return (
    <Modal
      {...props}
      aria-labelledby="write-review-modal-title"
      loading={isFetchingAssignment}
    >
      <>
        <h2
          id="write-review-modal-title"
          className="text-xl w-64 md:w-full truncate md:text-2xl mb-5 font-bold text-gray-900"
        >
          <Trans id="auth.review.modal.create.title">
            Review {assignment?.reviewee.firstName}'s performance
          </Trans>
        </h2>
        <UserHeader user={assignment?.reviewee} />

        <div className="border-b border-gray-300 my-8 w-full" />
        <ReviewForm
          loading={loading}
          onFormSubmit={async ({ input, setError }) => {
            const { errors } = await createReviewMutation({
              variables: { input: { ...input, assignmentId } },
              refetchQueries: [
                {
                  query: MeAssignmentsDocument,
                  variables: refetchVariables,
                },
              ],
            });

            if (errors) {
              enqueueSnackbar(
                i18n._(
                  defineMessage({
                    id: "notification.error.generic",
                    message: "Oops!, something went wrong.",
                  })
                ),
                {
                  variant: "error",
                }
              );
              return formatApiErrors(errors, setError);
            }

            enqueueSnackbar(
              i18n._(
                defineMessage({
                  id: "review.modal.create.notification.success",
                  message: "Review created successfully",
                })
              ),
              {
                variant: "success",
              }
            );

            handleClose();
          }}
        />
      </>
    </Modal>
  );
};
