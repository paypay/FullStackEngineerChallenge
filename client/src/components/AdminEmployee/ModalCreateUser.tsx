import { i18n } from "@lingui/core";
import { defineMessage, Trans } from "@lingui/macro";
import { useSnackbar } from "notistack";
import React, { FC } from "react";

import { handleClose, Modal, ModalProps } from "../";
import {
  CreateUserInput,
  useCreateUserMutation,
  UsersDocument,
} from "../../graphql/types";
import { formatApiErrors } from "../../helpers/formatApiErrors";
import { UserForm } from "./UserForm";

export const ModalCreateUser: FC<ModalProps> = ({
  refetchVariables,
  ...props
}) => {
  const [createUserMutation, { loading }] = useCreateUserMutation();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Modal aria-labelledby="modal-title" {...props}>
      <>
        <h2 id="modal-title" className="text-2xl mb-5 font-bold text-gray-900">
          <Trans id="admin.user.modal.create.title">Create User</Trans>
        </h2>
        <UserForm
          loading={loading}
          onFormSubmit={async ({ input, setError }) => {
            const { errors } = await createUserMutation({
              variables: { input: input as CreateUserInput },
              refetchQueries: [
                {
                  query: UsersDocument,
                  variables: refetchVariables,
                },
              ],
            });
            if (errors) {
              return formatApiErrors(errors, setError);
            }

            enqueueSnackbar(
              i18n._(
                defineMessage({
                  id: "admin.user.modal.create.notification.success",
                  message: "User created successfully",
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
