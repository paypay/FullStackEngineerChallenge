import { i18n } from "@lingui/core";
import { defineMessage, Trans } from "@lingui/macro";
import Popover from "@material-ui/core/Popover";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import CloseIcon from "@material-ui/icons/Close";
import { CoercedVariableValues } from "graphql/execution/values";
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";

import {
  useAssignReviewersMutation,
  User,
  UsersDocument,
  UserType,
  useSearchUserLazyQuery,
} from "../../graphql/types";
import { Autocomplete } from "../Autocomplete";
import { Avatar } from "../Avatar";
import { Button } from "../Button/Button";

export interface PopOverAssignReviewerProps {
  reviewee: Partial<User>;
  refetchVariables?: CoercedVariableValues["coerced"];
}

export const PopOverAssignReviewer: FC<PopOverAssignReviewerProps> = ({
  reviewee,
  refetchVariables,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAssignees([]);
  };

  const open = Boolean(anchorEl);
  const id = open ? "assign-reviewer-popover" : undefined;

  const { enqueueSnackbar } = useSnackbar();

  const [fetchUsers, { data, loading }] = useSearchUserLazyQuery({
    variables: { filters: { USER_TYPE: UserType.Employee } },
  });

  const [
    assignReviewersMutation,
    { loading: loadingAssignMutation },
  ] = useAssignReviewersMutation();

  const [assignees, setAssignees] = useState<any[]>([]);

  return (
    <span>
      <button
        title={i18n._(
          defineMessage({
            id: "admin.user.assignReviewer",
            message: "Assign reviewer",
          })
        )}
        aria-describedby={id}
        className="mx-1 md:mx-3"
        onClick={handleClick}
      >
        <AssignmentIndIcon />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="w-64 h-64 relative" style={{ width: 350, height: 500 }}>
          <div className="border-b border-gray-300 p-3 text-gray-600 text-center relative">
            <span className="">
              <Trans id="admin.popover.assignReviewer.title">
                Assign Reviewer
              </Trans>
            </span>
            <button className="absolute right-0 mr-3" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </button>
          </div>
          <div className="p-3">
            <Autocomplete
              options={data?.users.edges}
              loading={loading}
              placeholder={i18n._(
                defineMessage({
                  id: "admin.popover.assignReviewer.autocomplete.placeholder",
                  message: "Email address or name",
                })
              )}
              getOptionDisabled={({ node: user }) =>
                assignees.find((assignee) => assignee.id === user.id)
              }
              onSelected={({ node: user }) => {
                setAssignees([user, ...assignees]);
              }}
              renderOption={({ node: user }) => (
                <div className="flex items-center">
                  <Avatar size="xs" alt={user.firstName} src={user.avatar} />
                  <div className="ml-4 truncate">
                    <div className="text-lg -mb-1">
                      {user.firstName} {user.lastName}
                    </div>
                    <span className="text-gray-600">IT department</span>
                  </div>
                </div>
              )}
              onChange={(value) => {
                fetchUsers({
                  variables: {
                    filters: {
                      USER_TYPE: UserType.Employee,
                      SEARCH: value,
                    },
                  },
                });
              }}
            />

            {assignees.length === 0 && (
              <div className="flex items-center justify-center flex-col text-gray-700 mt-8 text-center">
                <div className="text-center mb-2">
                  <Avatar
                    src={reviewee.avatar}
                    alt={reviewee.lastName}
                    className="mr-2"
                  />
                </div>
                <span>
                  <Trans id="admin.popover.assignReviewer.help">
                    Invite other employees to rate <b>{reviewee.lastName}</b>{" "}
                    based on his performance
                  </Trans>
                </span>
              </div>
            )}

            {assignees.length > 0 && (
              <ul className="p-2 mt-3 max-h-84 overflow-y-scroll">
                <li className="font-medium text-gray-600 pb-2">
                  <Trans id="admin.popover.assignReviewer.assignees">
                    Assignees
                  </Trans>
                </li>
                {assignees.map((assignee) => (
                  <li key={assignee.id} className="py-2">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <Avatar
                          size="xs"
                          alt={assignee.firstName}
                          src={assignee.avatar}
                        />
                        <div className="ml-4 truncate">
                          <div className="text-lg -mb-1">
                            {assignee.firstName} {assignee.lastName}
                          </div>
                          <span className="text-gray-600">IT department</span>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setAssignees(
                            assignees.filter((user) => user.id !== assignee.id)
                          )
                        }
                        className="text-2lg text-gray-600"
                      >
                        <CancelRoundedIcon fontSize="inherit" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-2">
              <Button
                onClick={async () => {
                  const { errors } = await assignReviewersMutation({
                    variables: {
                      input: {
                        revieweeId: reviewee.id!,
                        reviewerIds: assignees.map((assignee) => assignee.id),
                      },
                    },
                    refetchQueries: [
                      {
                        query: UsersDocument,
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
                    return;
                  }

                  handleClose();

                  enqueueSnackbar(
                    i18n._(
                      defineMessage({
                        id: "admin.popover.assignReviewer.notification.success",
                        message: "Reviewers assigned successfully",
                      })
                    ),
                    {
                      variant: "success",
                    }
                  );
                }}
                disabled={loadingAssignMutation || assignees.length === 0}
              >
                <Trans id="admin.popover.assignReviewer.submit">Assign</Trans>
              </Button>
            </div>
          </div>
        </div>
      </Popover>
    </span>
  );
};
