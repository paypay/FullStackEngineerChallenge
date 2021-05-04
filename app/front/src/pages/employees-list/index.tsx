import React, { useCallback, useEffect, useState } from 'react';
import { useDataApi } from 'api';
import { AnimatePresence, motion } from 'framer-motion';
import { EmployeeCard, Button } from 'components';
import { withAuth, WithAuthPagePropsType } from 'api/withAuth';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useGlobalStore } from 'store';

const ListWrap = styled(motion.div)`
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
`;

function EmployeesList(props: WithAuthPagePropsType) {
  const [perPageV, setPerPageV] = useState(8);
  const currentPage = useGlobalStore(useCallback((s) => s.currentPage, []));
  const setCurrentPage = useGlobalStore(
    useCallback((s) => s.actions.updatePagination, [])
  );
  const { session } = props;
  const { fetchedData, isLoading } = useDataApi({
    assetType: 'employees',
    query: { page: currentPage, delay: 600, perPage: perPageV }
  });
  const [totalPages, setTotalPages] = useState(fetchedData?.totalPages);
  const router = useRouter();

  const handlePaging = useCallback((where: 'pre' | 'next') => {
    setCurrentPage(currentPage, where);
  }, []);

  useEffect(() => {
    if (fetchedData?.perPage) {
      setPerPageV(fetchedData.perPage);
    }
    if (fetchedData?.totalPages) {
      setTotalPages(fetchedData.totalPages);
    }
  }, [fetchedData?.perPage, fetchedData?.totalPages]);

  return (
    <ListWrap layoutId="appSection" layout={true}>
      <motion.div
        style={{ height: 584, overflow: 'hidden' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'space-around',
            height: 584,
            overflow: 'hidden'
          }}
        >
          <AnimatePresence>
            {fetchedData?.data.map((e) => {
              if (e.id !== session.id) {
                return (
                  <EmployeeCard
                    key={e.id}
                    isLoading={isLoading}
                    layout={true}
                    layoutId={`$employee-${e.id}`}
                    exit={{ opacity: 0 }}
                    employee={e}
                    onClick={() => {
                      router.push(`/employees-list/${e.id}`);
                    }}
                  />
                );
              }
            })}
          </AnimatePresence>
        </motion.ul>
      </motion.div>
      <div className="controls">
        <div>
          <Button
            disabled={fetchedData?.prePage === null}
            onClick={() => handlePaging('pre')}
          >
            prev page
          </Button>
          <Button
            disabled={fetchedData?.nextPage === null}
            onClick={() => handlePaging('next')}
            style={{ marginLeft: 8 }}
          >
            next page
          </Button>
        </div>
        <h4>
          page: {currentPage} of {totalPages}
        </h4>
      </div>
      <Button onClick={() => router.push('/dashboard')}>
        Go to your details page
      </Button>
    </ListWrap>
  );
}

export const getServerSideProps = withAuth();

export default EmployeesList;
