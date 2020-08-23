import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";

import {
  AvatarInfo,
  handleClose,
  Loading,
  Modal,
  ModalProps,
  Pagination,
  ReviewSummaryBlock,
  UserHeader,
} from "..";
import {
  useReviewsCommentsLazyQuery,
  useUserReportQuery,
} from "../../graphql/types";
import { Button } from "../Button";

export const ModalViewUser: FC<ModalProps> = ({
  refetchVariables,
  ...props
}) => {
  const router = useRouter();

  const userId = Number(router.query.view);

  const { data, loading: isFetchingUser } = useUserReportQuery({
    variables: { id: userId },
  });

  const [
    fetchComments,
    {
      data: reviewsData,
      loading: isFetchingReviews,
      variables: reviewsVariables,
    },
  ] = useReviewsCommentsLazyQuery({
    variables: {
      first: 3,
      filters: { REVIEWEE_ID: userId },
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    fetchComments();
  }, []);

  const user = data?.user;
  const reviews = reviewsData?.reviews.edges;

  return (
    <Modal
      {...props}
      aria-labelledby="view-review-modal-title"
      loading={isFetchingUser}
    >
      <>
        <h2
          id="view-review-modal-title"
          className="text-xl md:text-2xl mb-5 font-bold text-gray-900"
        >
          <Trans id="admin.user.modal.view.title">
            {user?.firstName}'s Report
          </Trans>
        </h2>
        <UserHeader user={user} rating={user?.reviewsSummary.rating} />

        {user && user.reviewsSummary.rating > 0 && (
          <>
            <div className="border-b border-gray-300 my-8 mb-4 w-full" />
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              <Trans id="admin.user.modal.view.overallReport">
                Overall Report
              </Trans>
            </h3>

            <ReviewSummaryBlock review={user?.reviewsSummary} />
          </>
        )}

        <div className="border-b border-gray-300 my-8 mb-4 w-full" />
        <div className="mb-10">
          {isFetchingReviews ? (
            <Loading />
          ) : (
            reviews &&
            reviews.length > 0 && (
              <>
                <h3 className="text-lg font-bold mb-5 text-gray-800">
                  <Trans id="admin.user.modal.view.comments">Comments</Trans>
                </h3>
                {reviews.map(({ node: review }) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-300 pb-4 mb-4"
                  >
                    <AvatarInfo data={review.user} size="sm" />
                    <p className="mt-4 text-gray-700">{review.comment}</p>
                  </div>
                ))}
                <Pagination
                  onPaginate={(cursor) => {
                    fetchComments({
                      variables: { ...reviewsVariables, after: cursor },
                    });
                  }}
                  pageInfo={reviewsData?.reviews.pageInfo}
                />
              </>
            )
          )}
        </div>

        <span className="mt-8 flex justify-end rounded-md sm:mt-0 sm:w-auto">
          <Button
            variant="default"
            className="w-auto"
            size="sm"
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
