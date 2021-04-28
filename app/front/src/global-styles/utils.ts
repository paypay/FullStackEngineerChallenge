import { baseFontSize } from 'global-styles';
import { ReactText } from 'react';

export const pxToRem = (px: ReactText, fixedTo2 = true, em?: boolean) => {
  const pixels =
    typeof px === 'string' ? parseFloat(px.replace(/[^0-9]/g, '')) : px;

  const remOrEm = em ? 'em' : 'rem';

  if (Math.round(pixels) !== pixels) {
    return `${(pixels / baseFontSize).toFixed(fixedTo2 ? 2 : 4)}${remOrEm}`;
  } else {
    return `${pixels / baseFontSize}${remOrEm}`;
  }
};
