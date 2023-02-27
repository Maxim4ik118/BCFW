import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from 'components/Loader/Loader';

import { getPostComments } from 'redux/operations';

import { CommentsList } from 'App.styled';

function CommentsPage() {
  const { postId } = useParams();
  const comments = useSelector(state => state.postData.comments);
  const isLoading = useSelector(state => state.postData.isLoading);
  const error = useSelector(state => state.postData.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postId === null) return;

    dispatch(getPostComments(postId))
  }, [postId, dispatch]);

  return (
    <div>
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... Message: {error}</p>}
      {comments !== null && (
        <CommentsList>
          {comments.map(comment => {
            return (
              <li key={comment.id}>
                <h3>UserName: {comment.name}</h3>
                <p>
                  <b>Email:</b> {comment.email}
                </p>
                <p>
                  <b>Body:</b> {comment.body}
                </p>
              </li>
            );
          })}
        </CommentsList>
      )}
    </div>
  );
}

export default CommentsPage;
