/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { getServerSideProps } from 'pages';
import { EmployeeType } from './ss-typings';

export type EmployeeNoPasswordType = Omit<EmployeeType, 'password'>;

export enum APP_COOKIES {
  APP_DESTINATION = 'humanResource_desired_destination',
  APP_SESSION = 'humanResource_session'
}

type AsyncReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : any;

export type InferWithAuthServerSideProps<
  T extends (...args: any) => Promise<{ props: any }>
> = AsyncReturnType<T>['props'];

type WithAuthServerSidePropsOptions = {
  authenticatedPage?: boolean;
  isLoginPage?: boolean;
};

export type AuthenticatedPageProps = {
  session: EmployeeNoPasswordType | null;
};

type EmptyProps = {
  props: Record<string, unknown>;
};

type DefaultWithAuthServerSideProps = {
  session: EmployeeNoPasswordType | null;
};

export type WithAuthPagePropsType<CustomPageProps = Record<string, unknown>> = {
  session: EmployeeNoPasswordType;
} & InferWithAuthServerSideProps<typeof getServerSideProps> &
  CustomPageProps;

export function withAuth<T extends EmptyProps = EmptyProps>(
  getServerSidePropsFunc?: (
    ctx: GetServerSidePropsContext,
    session?: EmployeeNoPasswordType | null
  ) => Promise<T>,
  options: WithAuthServerSidePropsOptions = { authenticatedPage: true }
) {
  return async function getMergedServerSideProps(
    ctx: GetServerSidePropsContext
  ): Promise<{ props: T['props'] & DefaultWithAuthServerSideProps }> {
    let session: EmployeeNoPasswordType | null = null;
    const { authenticatedPage } = options;
    const authCookie = nookies.get(ctx)[APP_COOKIES['APP_SESSION']];

    if (authCookie) {
      session = JSON.parse(authCookie);
    }

    // if it's an authenticated page and there is no session, redirect to login
    if (authenticatedPage && session === null) {
      nookies.set(ctx, APP_COOKIES['APP_DESTINATION'], ctx.resolvedUrl, {
        path: '/',
        maxAge: 480
      });
      return ({
        redirect: {
          destination: '/',
          permanent: false
        }
        // We have to trick the TS compiler here.
      } as unknown) as { props: T['props'] & DefaultWithAuthServerSideProps };
    }

    if (getServerSidePropsFunc) {
      return {
        props: {
          session,
          ...((await getServerSidePropsFunc(ctx, session)).props || {})
        }
      };
    }

    return {
      props: {
        session
      }
    };
  };
}
