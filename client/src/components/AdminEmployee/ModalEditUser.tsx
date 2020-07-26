import { i18n } from "@lingui/core";
import { defineMessage, Trans } from "@lingui/macro";
import { useRouter } from "next/dist/client/router";
import { useSnackbar } from "notistack";
import React, { FC } from "react";

import {
  UsersDocument,
  useUpdateUserMutation,
  useUserByIdQuery,
} from "../../graphql/types";
import { formatApiErrors } from "../../helpers/formatApiErrors";
import { handleClose, Modal, ModalProps } from "../Modal";
import { UserForm } from "./UserForm";

export const ModalEditUser: FC<ModalProps> = (props) => {
  const { query } = useRouter();

  const userId = Number(query.edit);

  const { data, loading: fetchingUser } = useUserByIdQuery({
    variables: { id: userId },
  });

  const { enqueueSnackbar } = useSnackbar();
  const [updateUserMutation, { loading }] = useUpdateUserMutation();

  return (
    <div>
      <Modal
        {...props}
        aria-labelledby="modal-edit-user-title"
        loading={fetchingUser}
      >
        <>
          <h2
            id="modal-edit-user-title"
            className="text-2xl mb-5 font-bold text-gray-900"
          >
            <Trans id="admin.user.modal.edit.title">Edit User</Trans>
          </h2>
          <UserForm
            user={data?.user}
            loading={loading}
            onFormSubmit={async ({ input, setError }) => {
              const { errors } = await updateUserMutation({
                variables: { id: userId, input },
                refetchQueries: [{ query: UsersDocument }],
              });
              if (errors) {
                return formatApiErrors(errors, setError);
              }
              enqueueSnackbar(
                i18n._(
                  defineMessage({
                    id: "admin.user.modal.edit.notification.success",
                    message: "User updated successfully",
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
    </div>
  );
};
