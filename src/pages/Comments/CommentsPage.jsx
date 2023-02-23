import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from 'components/Loader/Loader';

import { requestComments } from 'services/api';

import { CommentsList } from 'App.styled';
import { useParams } from 'react-router-dom';
// import { clearComments } from 'redux/postsSlice';
// import { setComments, setError, setIsLoading } from 'redux/postsSlice';

function CommentsPage() {
  const { postId } = useParams();
  const comments = useSelector(state => state.postData.comments);
  const isLoading = useSelector(state => state.postData.isLoading);
  const error = useSelector(state => state.postData.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postId === null) return;

    async function fetchComments(postId) {
      try {
        // dispatch(setIsLoading(true))
        dispatch({ type: 'posts/setIsLoading', payload: true });

        const comments = await requestComments(postId);

        // dispatch(setComments(comments))
        dispatch({ type: 'posts/setComments', payload: comments });
        // dispatch(clearComments());
        // dispatch({ type: 'posts/clearComments' });
      } catch (error) {
        // dispatch(setError(error))
        dispatch({ type: 'posts/setError', payload: error.message });
      } finally {
        // dispatch(setIsLoading(false))
        dispatch({ type: 'posts/setIsLoading', payload: false });
      }
    }

    fetchComments(postId);
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
