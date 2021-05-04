import { withAuth, WithAuthPagePropsType } from 'api/withAuth';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import { useRouter } from 'next/router';

export const DashboardSection = styled(motion.section)`
  h1 {
    margin-bottom: 48px;
  }
  .profile {
    font-family: ${(p) => p.theme.fontFamily.headings};
    display: flex;
    .img {
      margin-right: 16px;
      font-size: 0;
    }
  }
`;

function Dashboard(props: WithAuthPagePropsType) {
  const router = useRouter();
  const { session } = props;

  return (
    <DashboardSection
      layout={true}
      layoutId="appSection"
      className="dashboard-wrap"
    >
      <h1>Dashboard</h1>
      <div className="profile">
        <div className="pixel-border img">
          <Image src={session.photoUrl} width={250} height={220} />
        </div>
        <span>
          <h3>
            {'>'} {session.name}
          </h3>
          <h4>
            {'>'} {session.email}
          </h4>
          <hr />
          <p>
            {'>'} department: {session.department}
          </p>
          <p>
            {'>'} Your rating: {session.rating}
          </p>
          <Button onClick={() => router.push('/employees-list')}>
            Go to employees list
          </Button>
        </span>
      </div>
    </DashboardSection>
  );
}

export const getServerSideProps = withAuth();

export default Dashboard;
