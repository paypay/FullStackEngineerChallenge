import React, { useCallback, useEffect } from 'react';
import { APP_COOKIES, withAuth, WithAuthPagePropsType } from 'api/withAuth';
import { motion } from 'framer-motion';
import nookies, { setCookie } from 'nookies';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Button } from 'components';
import { staticEmployees } from 'api';

const LoginForm = styled(motion.div)`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  fieldset {
    padding: 0;
    border: 0;
    text-align: center;
    span {
      display: block;
      margin: 16px 0;
    }
  }
  .login-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 2px solid ${(p) => p.theme.colors.black};
    border-radius: 8px;
    padding: 48px;
    background-clip: content-box;
    position: relative;
    box-shadow: 0 0 8px ${(p) => p.theme.colors.grayscale.veryLightGray};
    .app-input {
      &:not(:last-child) {
        margin-bottom: 12px;
      }
    }
    &::before {
      content: ' ';
      position: absolute;
      z-index: -1;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border: 2px dashed black;
      border-radius: 8px;
    }
  }
`;

// login page
function Index(props: WithAuthPagePropsType) {
  const router = useRouter();

  const { desiredDestination, session } = props;

  const handleLogin = useCallback((role: 'admin' | 'regular') => {
    const employee = staticEmployees[role];

    setCookie(null, APP_COOKIES['APP_SESSION'], JSON.stringify(employee));

    router.push(desiredDestination || '/dashboard');
  }, []);

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session]);

  return (
    <LoginForm initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>Human Resources</h1>
      <motion.section
        className="login-wrap"
        layout={true}
        layoutId="appSection"
      >
        {!session ? (
          <fieldset>
            <div>
              <Button onClick={() => handleLogin('admin')}>log as admin</Button>
            </div>
            <span>------ or ------</span>
            <div>
              <Button onClick={() => handleLogin('regular')}>
                log as regular worker
              </Button>
            </div>
          </fieldset>
        ) : (
          <p>...redirecting</p>
        )}
      </motion.section>
    </LoginForm>
  );
}

export const getServerSideProps = withAuth(
  async (ctx, session) => {
    const dest = nookies.get(ctx)[APP_COOKIES['APP_DESTINATION']];

    return {
      props: {
        session,
        desiredDestination: dest || '/dashboard'
      }
    };
  },
  { authenticatedPage: false }
);

export default Index;
