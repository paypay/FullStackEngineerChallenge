import React, { FC } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

type ButtonType = HTMLMotionProps<'button'>;

const Button: FC<ButtonType> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <motion.button
      className={`${className || ''} pixel-border`}
      whileTap={{ scale: 0.96 }}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;
