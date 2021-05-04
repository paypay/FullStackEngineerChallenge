import { AnimatePresence, motion } from 'framer-motion';
import React, {
  FC,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes
} from 'react';
import styled, { css } from 'styled-components';

type InputType = {
  error?: string;
  label?: string;
  id: string;
  type?: 'text' | 'password';
} & InputHTMLAttributes<HTMLInputElement>;

const InputWrapper = styled.div<{ error?: string }>`
  width: 180px;

  label {
    margin-bottom: 4px;
    display: inline-block;
    text-transform: uppercase;
    font-size: 12px;
  }

  input {
    width: 100%;
    height: 36px;
    padding: 8px;
    //border: 1px solid ${(p) => p.theme.colors.grayscale.dimGray};
    //border-radius: 8px;
    &:focus {
      outline: 0;
      border-color: ${(p) => p.theme.colors.primary.base};
    }

    ${(p) =>
      p.error &&
      css`
        border-color: ${p.theme.colors.danger};
      `};
  }
`;

const FormInput = forwardRef<HTMLInputElement, InputType>(function FormInput(
  props,
  ref
) {
  const { error, id, label, type, ...inputProps } = props;

  return (
    <InputWrapper
      error={error}
      className={`${props.className || ''} app-input`}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type || 'text'}
        id={id}
        name={id}
        {...inputProps}
        ref={ref}
        className="pixel-border"
      />
      <AnimatePresence>
        {error && (
          <motion.div animate={{ height: 'auto', opacity: 1 }}></motion.div>
        )}
      </AnimatePresence>
    </InputWrapper>
  );
});

export default FormInput;
