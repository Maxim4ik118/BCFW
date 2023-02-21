import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';

// import CommentsPage from 'pages/Comments/CommentsPage';
import Loader from 'components/Loader/Loader';

import { requestPostDetails } from 'services/api';

const LazyCommentsPage = lazy(() => import('pages/Comments/CommentsPage'));

function PostDetailsPage() {
  const { postId } = useParams();
  const location = useLocation();
  console.log('PostDetailsPage location: ', location);

  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPostDetails(postId) {
      try {
        setIsLoading(true);

        const details = await requestPostDetails(postId);

        setDetails(details);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPostDetails(postId);
  }, [postId]);

  const isCommentsVisible = location.pathname.includes('comments');
  return (
    <div>
      {isLoading && <Loader />}
      {error !== null && <p>Oops, some error occured... Message: {error}</p>}
      <Link to={location.state?.from ?? '/'}>Go back</Link>
      <h1>PostDetails</h1>
      <br />
      Current postId: {postId}
      {Boolean(details) && (
        <div>
          <p>
            <b>Title:</b> {details.title}
          </p>
          <p>
            <b>Body:</b> {details.body}
          </p>
        </div>
      )}
      <NavLink
        state={{ from: location.state?.from ?? '/' }}
        to={isCommentsVisible ? '' : 'comments'}
      >
        Comments
      </NavLink>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="comments" element={<LazyCommentsPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default PostDetailsPage;
