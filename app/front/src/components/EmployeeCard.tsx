import React, { FC, useEffect, useRef, useState } from 'react';
import { EmployeeNoPasswordType } from 'api/withAuth';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import styled from 'styled-components';
import Image from 'next/image';

export function useForceUpdate() {
  const [value, setState] = useState(true);
  return () => setState(!value);
}

type EmployeeCardType = {
  employee?: EmployeeNoPasswordType;
  isLoading?: boolean;
} & HTMLMotionProps<'li'>;

const EmployeeCardWrap = styled(motion.li)`
  width: 200px;
  height: 260px;
  margin: 16px 0;
  perspective: 600px;

  .card {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transform-style: preserve-3d;
    transform-origin: center right;
    display: block;
    h2 {
      font-size: 10px;
      margin-top: 32px;
    }
    h3 {
      font-size: 4px;
    }
  }

  .info {
    padding-left: 8px;
  }

  .img {
    font-size: 0;
  }
`;

const EmployeeCard: FC<EmployeeCardType> = (props) => {
  const { employee, ...rest } = props;
  const cardError = useRef(false);
  const update = useForceUpdate();

  return (
    <EmployeeCardWrap {...rest} layout={true} whileHover={{ scale: 1.05 }}>
      <motion.div className="card pixel-border ">
        <AnimatePresence>
          {employee ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="img">
                <Image
                  src={
                    cardError.current
                      ? 'http://placehold.jp/250x230.png'
                      : employee.photoUrl
                  }
                  width={200}
                  height={140}
                  onError={() => {
                    cardError.current = true;
                    update();
                  }}
                />
              </div>
              <div className="info">
                <h2>{employee.name}</h2>
                <h3>rating: {employee.rating}</h3>
                <h4>number of reviews {employee.reviews.length}</h4>
              </div>
            </motion.div>
          ) : (
            '...loading'
          )}
        </AnimatePresence>
      </motion.div>
    </EmployeeCardWrap>
  );
};

export default EmployeeCard;
