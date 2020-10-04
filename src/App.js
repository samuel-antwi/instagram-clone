import React, { useRef, useEffect, useContext } from 'react';
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from 'react-router-dom';
import LoginPage from './pages/login';
import FeedPage from './pages/feed';
import SignUpPage from './pages/signup';
import ExplorePage from './pages/explore';
import ProfilePage from './pages/profile';
import EditProfilePage from './pages/edit-profile';
import PostPage from './pages/post';
import NotFoundPage from './pages/not-found';
import Inbox from './pages/inbox';
import PostModal from './components/post/PostModal';
import SavedPhotos from './pages/saved-photos';
import Tagged from './pages/tagged';
import Channel from './pages/channel';
import { AuthContext } from './auth';
import { useSubscription } from '@apollo/react-hooks';
import { Me } from './graphql/subscription';
import { LoadingBigIcon } from './components/shared/LoadingScreen';

export const UserContext = React.createContext();

const App = () => {
  const { authState } = useContext(AuthContext);
  const isAuth = authState.status === 'in';
  const userId = isAuth ? authState.user.uid : null;
  const variables = { userId };
  const { data, loading, error } = useSubscription(Me, { variables });
  const history = useHistory();
  const location = useLocation();
  const prevLocation = useRef(location);
  const modal = location.state?.modal;

  useEffect(() => {
    if (history.action !== 'POP' && !modal) {
      prevLocation.current = location;
      window.scrollTo(0, 0);
    }
  }, [location, modal, history.action]);

  if (loading) {
    return <LoadingBigIcon />;
  }

  if (!isAuth) {
    return (
      <Switch>
        <Route path='/accounts/login' component={LoginPage} />
        <Route path='/accounts/emailsignup' component={SignUpPage} />
        <Redirect to='/accounts/login' />
      </Switch>
    );
  }

  const isModalOpen = modal && prevLocation.current !== location;
  const me = isAuth && data ? data.users[0] : null;
  const currentUserId = me.id;

  return (
    <UserContext.Provider value={{ me, currentUserId }}>
      <Switch location={isModalOpen ? prevLocation.current : location}>
        <Route exact path='/' component={FeedPage} />
        <Route path='/explore' component={ExplorePage} />
        <Route exact path='/:username' component={ProfilePage} />
        <Route exact path='/:username/saved' component={SavedPhotos} />
        <Route exact path='/:username/tagged' component={Tagged} />
        <Route exact path='/:username/channel' component={Channel} />
        <Route exact path='/post/:postId' component={PostPage} />
        <Route path='/accounts/edit' component={EditProfilePage} />
        <Route path='/accounts/password/change' component={EditProfilePage} />
        <Route path='/accounts/login' component={LoginPage} />
        <Route path='/accounts/emailsignup' component={SignUpPage} />
        <Route path='/direct/inbox' component={Inbox} />

        <Route component={NotFoundPage} />
      </Switch>
      {isModalOpen && (
        <Route exact path='/post/:postId' component={PostModal} />
      )}
    </UserContext.Provider>
  );
};

export default App;
