import React from 'react';
import { StyledLoader } from './Styled';

function Loader({ className }) {
  return (
    <StyledLoader className={className}>
      <div />
    </StyledLoader>
  );
}

export default Loader;
