import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import React, { FC } from "react";

import { Button } from "../";
import { useDeleteUserMutation, UsersDocument } from "../../graphql/types";
import { handleClose, Modal, ModalProps } from "../Modal";

export const ModalDeleteUser: FC<ModalProps> = ({
  refetchVariables,
  ...props
}) => {
  const { query } = useRouter();

  const userId = Number(query.delete);

  const [deleteUserMutation, { loading }] = useDeleteUserMutation();

  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...props}
        size="md"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await deleteUserMutation({
              variables: { id: userId },
              refetchQueries: [
                { query: UsersDocument, variables: refetchVariables },
              ],
            });

            handleClose();
          }}
        >
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                <Trans id="admin.user.modal.delete.tile">Delete user</Trans>
              </h3>
              <div className="mt-2">
                <p
                  id="modal-description"
                  className="text-sm leading-5 text-gray-500"
                >
                  <Trans id="admin.user.modal.delete.description">
                    Are you sure you want to delete this user? All of his data
                    will be permanently removed. This action cannot be undone.
                  </Trans>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 mt-5 py-1 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <Button
                type="submit"
                size="sm"
                disabled={loading}
                className="w-auto"
              >
                <Trans id="admin.user.modal.delete">Delete</Trans>
              </Button>
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <Button
                variant="default"
                className="w-auto"
                size="sm"
                type="button"
                onClick={() => handleClose()}
              >
                <Trans id="admin.user.modal.cancel">Cancel</Trans>
              </Button>
            </span>
          </div>
        </form>
      </Modal>
    </div>
  );
};
