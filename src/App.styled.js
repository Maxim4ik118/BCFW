import styled from 'styled-components';

export const ListsContainer = styled.div`
  display: flex;
  padding: 0 15px;
  position: relative;
`;

export const PostsList = styled.ul`
  display: flex;
  flex-basis: 60%;
  flex-grow: 1;
  flex-shrink: 1;
  padding-left: 0;
  padding-right: 7px;
  flex-direction: column;
  list-style-type: none;
  & button {
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
  }
  & li {
    padding: 15px;
    border: 2px solid gray;
    transition: all .3s;
    margin-bottom: 15px;
    &.selected {
      border: 2px solid yellow;
    }
  }
`;



export const CommentsList = styled.ul`
  display: flex;
  flex-basis: 40%;
  flex-grow: 1;
  flex-shrink: 1;
  flex-direction: column;
  padding-left: 7px;
  list-style-type: none;
  max-height: 100vh;
  overflow-y: scroll;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  & li {
    padding: 15px;
    margin-bottom: 15px;
    border: 1px solid blue;
  }
`;
