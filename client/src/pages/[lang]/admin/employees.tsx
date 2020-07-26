import { i18n } from "@lingui/core";
import { defineMessage, Trans } from "@lingui/macro";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import LaunchIcon from "@material-ui/icons/Launch";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { FC } from "react";

import {
  AvatarInfo,
  Button,
  Container,
  Layout,
  PageHeader,
  Rating,
  ReviewProgress,
  SearchForm,
  Table,
} from "../../../components";
import { ModalCreateUser } from "../../../components/AdminEmployee/ModalCreateUser";
import { ModalDeleteUser } from "../../../components/AdminEmployee/ModalDeleteUser";
import { ModalEditUser } from "../../../components/AdminEmployee/ModalEditUser";
import { ModalViewUser } from "../../../components/AdminEmployee/ModalViewUser";
import { PopOverAssignReviewer } from "../../../components/AdminEmployee/PopoverAssignReviewer";
import { UserType, useUsersQuery } from "../../../graphql/types";
import { getLocationSearch } from "../../../helpers/getRoutePath";

const Employees: FC = () => {
  const router = useRouter();

  const { data, refetch, variables: refetchVariables, loading } = useUsersQuery(
    {
      variables: {
        first: 10,
        after: router.query.after as string,
        filters: { USER_TYPE: UserType.Employee },
      },
    }
  );
  const users = data?.users.edges;

  return (
    <>
      <Layout
        title={i18n._(
          defineMessage({
            id: "admin.employees.seo.title",
            message: "Employees",
          })
        )}
        autoLayout={false}
      >
        <PageHeader
          flexible={true}
          title={i18n._(
            defineMessage({
              id: "admin.employees.title",
              message: "Employees",
            })
          )}
          help={
            <fieldset className="hidden md:block text-gray-700 flex-shrink-0 rounded border p-3 mb-4 md:mb-6 border-gray-400">
              <legend className="font-medium">
                <Trans id="admin.employees.icons.legend">Icons legend</Trans>:
              </legend>
              <div className="grid md:grid-cols-2 gap-1 md:gap-5">
                <div className="flex items-center">
                  <VisibilityIcon />
                  <span className="ml-1">
                    <Trans id="admin.employees.legend.view">View user</Trans>
                  </span>
                </div>

                <div className="flex items-center">
                  <EditIcon />
                  <span className="ml-1">
                    <Trans id="admin.employees.legend.edit">Edit user</Trans>
                  </span>
                </div>
                <div className="flex items-center">
                  <AssignmentIndIcon />
                  <span className="ml-1">
                    <Trans id="admin.employees.legend.assign">
                      Assign Reviewer
                    </Trans>
                  </span>
                </div>

                <div className="flex items-center">
                  <DeleteForeverIcon />
                  <span className="ml-1">
                    <Trans id="admin.employees.legend.delete">
                      Delete User
                    </Trans>
                  </span>
                </div>
              </div>
            </fieldset>
          }
        ></PageHeader>

        <Container className="max-w-screen-xl mx-auto">
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <SearchForm
                name="search"
                onDebounce={(value) =>
                  refetch({
                    filters: {
                      SEARCH: value,
                      USER_TYPE: UserType.Employee,
                    },
                  })
                }
                placeholder={i18n._(
                  defineMessage({
                    id: "admin.employees.search.placeholder",
                    message: "Search by name",
                  })
                )}
              />

              <Button className="w-auto py-1 font-medium">
                <Link
                  href={`${router.route}${getLocationSearch()}&create=0`}
                  as={router.asPath}
                  shallow={true}
                >
                  <a className="flex items-center">
                    <PersonAddIcon className="mr-2" fontSize="small" />
                    <Trans id="admin.employees.button.add">Add User</Trans>
                  </a>
                </Link>
              </Button>
            </div>
          </div>

          <Table
            loading={loading}
            search={refetchVariables?.filters?.SEARCH}
            isEmpty={users?.length === 0}
            pageInfo={data?.users.pageInfo}
          >
            <thead>
              <tr>
                <th className="md:w-1/4"></th>
                <th className="md:w-1/4"></th>
                <th></th>
                <th className="md:w-1/5"></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users?.map(({ node: user }) => (
                <tr key={user.id} className="border-gray-400 border-t">
                  <td className="py-3 px-4">
                    <AvatarInfo data={user} />
                  </td>

                  <td className="whitespace-no-wrap px-4">
                    <Rating rate={user.rating} />
                  </td>
                  <td />
                  <td className="whitespace-no-wrap px-4">
                    <ReviewProgress stats={user.assignmentStats} />
                  </td>
                  <td className="text-right whitespace-no-wrap px-4 w-64">
                    <div className="inline-block align-middle text-gray-600">
                      <Link
                        href={`${router.route}${getLocationSearch()}&view=${
                          user.id
                        }`}
                        as={router.asPath}
                        shallow={true}
                      >
                        <a className="mr-1 md:mr-3">
                          <VisibilityIcon />
                        </a>
                      </Link>

                      <LaunchIcon className="mx-1 md:mx-3 text-gray-300 cursor-not-allowed" />

                      <PopOverAssignReviewer
                        reviewee={user}
                        refetchVariables={refetchVariables}
                      />

                      <Link
                        href={`${router.route}${getLocationSearch()}&edit=${
                          user.id
                        }`}
                        as={router.asPath}
                        shallow={true}
                      >
                        <a className="mx-1 md:mx-3">
                          <EditIcon />
                        </a>
                      </Link>

                      <Link
                        href={`${router.route}${getLocationSearch()}&delete=${
                          user.id
                        }`}
                        as={router.asPath}
                        shallow={true}
                      >
                        <a className="ml-1 md:ml-3">
                          <DeleteForeverIcon />
                        </a>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {router.query.view && <ModalViewUser />}

          {router.query.create && (
            <ModalCreateUser
              refetchVariables={refetchVariables}
              closeable={false}
            />
          )}
          {router.query.edit && <ModalEditUser />}
          {router.query.delete && (
            <ModalDeleteUser refetchVariables={refetchVariables} />
          )}
        </Container>
      </Layout>
    </>
  );
};

export default Employees;
