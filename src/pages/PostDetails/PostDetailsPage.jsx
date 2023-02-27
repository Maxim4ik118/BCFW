import React, { lazy, Suspense, useEffect } from 'react';
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import CommentsPage from 'pages/Comments/CommentsPage';
import Loader from 'components/Loader/Loader';

import { getPostDetails } from 'redux/operations';

const LazyCommentsPage = lazy(() => import('pages/Comments/CommentsPage'));

function PostDetailsPage() {
  const { postId } = useParams();
  const location = useLocation();

  const details = useSelector(state => state.postData.details);
  const isLoading = useSelector(state => state.postData.isLoading);
  const error = useSelector(state => state.postData.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if(postId === null) return;

    dispatch(getPostDetails(postId));
  }, [postId, dispatch]);

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
