import { withAuth, WithAuthPagePropsType } from 'api/withAuth';
import { AnimatePresence, motion } from 'framer-motion';
import { DashboardSection } from 'pages/dashboard';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from 'components';
import router from 'next/router';
import { apiRoutes, EmployeeType } from 'api';
import { useForceUpdate } from 'components/EmployeeCard';

const delayOperation = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));

const EmployeeDetail = (
  props: WithAuthPagePropsType & { employee: { data: EmployeeType | null } }
) => {
  const { session, employee } = props;
  const [deleting, setDeleting] = useState(false);
  const cardError = useRef(false);
  const [done, setDone] = useState(false);
  const update = useForceUpdate();

  const handleDelete = useCallback(async () => {
    setDeleting(true);
    await delayOperation(2000);
    try {
      const del = await fetch(
        `http://localhost:9090/employees/${employee.data?.id}`,
        {
          method: 'DELETE'
        }
      );
      const delJson = await del.json();
      if (delJson) {
        setDone(true);
        setDeleting(false);
        await delayOperation(3000);
        router.replace('/employees-list');
      }
    } catch (e) {
      setDone(true);
      setDeleting(false);
    }
  }, []);

  return (
    <motion.div layoutId={`$employee-${employee.data?.id}`} layout={true}>
      <DashboardSection layout={true} className="dashboard-wrap">
        {employee && (
          <>
            <h1> {employee.data?.name}</h1>
            <div className="profile">
              <div className="pixel-border img">
                <Image
                  src={
                    cardError.current
                      ? 'http://placehold.jp/250x230.png'
                      : employee.data?.photoUrl || ''
                  }
                  width={250}
                  height={220}
                  onError={() => {
                    cardError.current = true;
                    update();
                  }}
                />
              </div>
              <span>
                <h3>
                  {'>'} {employee.data?.name}
                </h3>
                <h4>
                  {'>'} {employee.data?.email}
                </h4>
                <hr />
                <p>
                  {'>'} department: {employee.data?.department}
                </p>
                <p>
                  {'>'} Your rating: {employee.data?.rating}
                </p>
                <Button onClick={() => router.push('/employees-list')}>
                  Go back to the list
                </Button>
                {session.department === 'Admin' && !done && (
                  <div style={{ marginTop: 16 }}>
                    <Button
                      onClick={() => handleDelete()}
                      style={{ background: 'red' }}
                    >
                      Delete this employee
                    </Button>
                  </div>
                )}
                <AnimatePresence>
                  {deleting && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ display: 'block' }}
                    >
                      ...deleting
                    </motion.span>
                  )}
                </AnimatePresence>
                {done && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ color: 'red', fontSize: 10 }}
                  >
                    This employee was removed..., going back to Employees list
                  </motion.p>
                )}
              </span>
            </div>
          </>
        )}
      </DashboardSection>
    </motion.div>
  );
};

export const getServerSideProps = withAuth(async (ctx) => {
  const { id } = ctx.query; // employee id;
  const emp = await fetch(`${apiRoutes.employees}/${id}`);
  const empJson = (await emp.json()) as EmployeeType;

  return {
    props: {
      employee: empJson
    }
  };
});

export default EmployeeDetail;
