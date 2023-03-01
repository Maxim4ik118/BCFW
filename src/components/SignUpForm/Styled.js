import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto 25px;

  .input-group {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .form-title {
    font-size: 25px;
    font-weight: 500;
    text-align: center;
    margin: 0;
  }
`;

