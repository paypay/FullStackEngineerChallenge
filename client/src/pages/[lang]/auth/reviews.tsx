import { i18n } from "@lingui/core";
import { defineMessage, Trans } from "@lingui/macro";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { FC } from "react";

import {
  Avatar,
  ButtonLink,
  Container,
  Layout,
  PageHeader,
  SearchForm,
  Table,
  Tabs,
} from "../../../components";
import { ModalViewReview } from "../../../components/ReviewPage/ModalViewReview";
import { ModalWriteReview } from "../../../components/ReviewPage/ModalWriteReview";
import {
  AssignmentStatus,
  useMeAssignmentsQuery,
} from "../../../graphql/types";
import {
  getCurrentLocationParams,
  getLocationSearch,
} from "../../../helpers/getRoutePath";

const Reviews: FC = () => {
  const { query, ...router } = useRouter();

  const filterStatus =
    (query.status as AssignmentStatus) || AssignmentStatus.Pending;

  const {
    data,
    refetch,
    variables: refetchVariables,
    loading,
  } = useMeAssignmentsQuery({
    variables: {
      after: query.after as string,
      filters: {
        STATUS: filterStatus,
      },
    },
  });

  const assignments = data?.me?.assignments.edges;

  return (
    <Layout
      title={i18n._(
        defineMessage({ id: "auth.reviews.seo.title", message: "Reviews" })
      )}
      autoLayout={false}
    >
      <PageHeader
        title={i18n._(
          defineMessage({ id: "auth.reviews.title", message: "Reviews" })
        )}
      >
        <div className="absolute bottom-0 w-full">
          <Tabs>
            <Tabs.Tab
              selected={filterStatus === "PENDING"}
              onClick={() => {
                router.push(`${router.route}?status=PENDING`, router.asPath);
              }}
            >
              <Trans id="auth.reviews.tab.pending">Pending</Trans>
            </Tabs.Tab>
            <Tabs.Tab
              selected={filterStatus === "COMPLETED"}
              onClick={() => {
                router.push(`${router.route}?status=COMPLETED`, router.asPath);
              }}
            >
              <Trans id="auth.reviews.tab.completed">Completed</Trans>
            </Tabs.Tab>
          </Tabs>
        </div>
      </PageHeader>

      <Container className="md:px-8 mt-8">
        <SearchForm
          name="search"
          clearOnRouteChange={true}
          onDebounce={(value) => {
            refetch({
              after: undefined,
              filters: {
                ...refetchVariables!.filters,
                SEARCH: value,
              },
            });
          }}
          placeholder={i18n._(
            i18n._(
              "auth.reviews.search.placeholder",
              {},
              { message: "Search by name" }
            )
          )}
        />

        <div className="w-full mt-8">
          <Table
            loading={loading}
            search={refetchVariables?.filters?.SEARCH}
            pageInfo={data?.me?.assignments.pageInfo}
            isEmpty={assignments?.length === 0}
          >
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {assignments?.map(({ node: assignment }) => (
                <tr key={assignment.id} className="border-gray-400 border-t">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Avatar
                        alt={assignment.reviewee.firstName}
                        src={assignment.reviewee.avatar}
                      />

                      <div className="ml-4 truncate">
                        <div className="font-medium text-lg -mb-1">
                          {assignment.reviewee.firstName}{" "}
                          {assignment.reviewee.lastName}
                        </div>
                        <span className="text-gray-600">
                          <Trans id="generic.position">Backend Developer</Trans>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-right">
                    {assignment.status === AssignmentStatus.Pending && (
                      <Link
                        href={`${router.route}${getLocationSearch()}&create=${
                          assignment.id
                        }`}
                        as={router.asPath}
                        passHref
                        shallow={true}
                      >
                        <ButtonLink className="w-auto px-4 py-1">
                          <Trans id="auth.review.writeReview">Review</Trans>
                        </ButtonLink>
                      </Link>
                    )}
                    {assignment.status === AssignmentStatus.Completed && (
                      <Link
                        href={`${
                          router.route
                        }${getCurrentLocationParams()}&view=${assignment.id}`}
                        as={router.asPath}
                        passHref
                        shallow={true}
                      >
                        <ButtonLink
                          variant="gray"
                          className="w-auto md:px-4 py-1"
                        >
                          <Trans id="auth.review.view">View</Trans>
                        </ButtonLink>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>

      {query.view && <ModalViewReview refetchVariables={refetchVariables} />}

      {query.create && <ModalWriteReview refetchVariables={refetchVariables} />}
    </Layout>
  );
};

export default Reviews;
