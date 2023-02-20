import React, { useEffect, useState } from 'react';

import Loader from 'components/Loader/Loader';

import { requestComments } from 'services/api';

import { CommentsList } from 'App.styled';
import { useParams } from 'react-router-dom';

function CommentsPage() {
  const { postId } = useParams();
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchComments(postId) {
    try {
      setIsLoading(true);

      const comments = await requestComments(postId);

      setComments(comments);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (postId === null) return;

    fetchComments(postId);
  }, [postId]);

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
