import React, { useState, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { RiCloseCircleLine } from 'react-icons/ri';
import { BiUserCircle } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import styled from 'styled-components';
import {
  HomeActiveIcon,
  HomeIcon,
  ExploreIcon,
  ExploreActiveIcon,
  LikeIcon,
  ShareIcon,
  LikeActiveIcon,
  InboxActiveIcon,
  LoadingIcon,
  SaveIcon,
  GearIcon,
  AddIcon,
} from '../../icons';

import NotificationList from '../notification/NotificationList';
import useOutsideClick from '@rooks/use-outside-click';
import { AuthContext } from '../../auth';
import { UserContext } from '../../App';
import { useLazyQuery } from '@apollo/react-hooks';
import { SEARCH_USERS } from '../../graphql/queries';
import AddPostDialog from '../post/AddPostDialog';

const Navbar = ({ minimalNavbar }) => {
  return (
    <Styles>
      <div className='border border-gray-500 bg-white fixed w-full z-10'>
        <div className='container mx-auto '>
          <div className='flex items-center justify-between'>
            <Link to='/'>
              <img
                style={{ width: '110px' }}
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
                alt='Instagram'
              />
            </Link>
            <div className='hidden md:block'>
              {!minimalNavbar && <SearchInput />}
            </div>
            <div>{!minimalNavbar && <IconLinks />}</div>
          </div>
        </div>
      </div>
    </Styles>
  );
};

// Right Nav Icons links
const IconLinks = () => {
  const { me } = useContext(UserContext);
  const [showList, setShowList] = useState(false);
  const [accountToolTip, setAccountToolTip] = useState(false);
  const [media, setMedia] = useState(null);
  const [showAddPostDialog, setShowAddPostDialog] = useState(false);
  const history = useHistory();
  const path = history.location.pathname;
  const inputRef = useRef();

  // onclick will toggle notification tooltip and close profile tooltip if it is opened
  const handleToggleList = () => {
    setShowList((prevShow) => !prevShow);
    setAccountToolTip(false);
  };

  // Conditionally show and hide notification tooltip depending on the state
  const handleList = () => {
    setShowList(false);
  };
  //  onclick will toggle profile tooltip and close notification tooltip if it is opened
  const toggleProfileToolTip = () => {
    setAccountToolTip((prevToolTip) => !prevToolTip);
    setShowList(false);
  };

  const openFileInput = () => {
    inputRef.current.click();
    // setShowAddPostDialog(true);
  };

  const handleAddPost = (e) => {
    setMedia(e.target.files[0]);
    setShowAddPostDialog(true);
  };

  // function to close Add post  dialog
  const handleCloseAddPostDialog = () => {
    setShowAddPostDialog(false);
  };

  return (
    <React.Fragment>
      {showList && <NotificationList handleList={handleList} />}
      {showAddPostDialog && (
        <AddPostDialog
          media={media}
          handleCloseAddPostDialog={handleCloseAddPostDialog}
        />
      )}
      <div className='flex items-center right'>
        <input
          accept='images'
          onChange={handleAddPost}
          ref={inputRef}
          style={{ display: 'none' }}
          type='file'
        />
        <AddIcon onClick={openFileInput} />

        <Link to='/'>{path === '/' ? <HomeActiveIcon /> : <HomeIcon />}</Link>
        <Link to='/direct/inbox'>
          {path === '/direct/inbox' ? <InboxActiveIcon /> : <ShareIcon />}
        </Link>
        <Link to='/explore'>
          {path === '/explore' ? <ExploreActiveIcon /> : <ExploreIcon />}
        </Link>
        <div onClick={handleToggleList}>
          {showList ? (
            <LikeActiveIcon className='cursor-pointer ' />
          ) : (
            <LikeIcon className='cursor-pointer' />
          )}
        </div>
        <button
          onClick={toggleProfileToolTip}
          className='rounded-full user-avatar focus:outline-none'>
          <img
            style={{ width: 24, height: 24, objectFit: 'cover' }}
            className=' rounded-full  '
            src={me.profile_image}
            alt='User'
          />
        </button>
      </div>
      {accountToolTip && (
        <ProfileToolTip toggleProfileToolTip={toggleProfileToolTip} />
      )}
    </React.Fragment>
  );
};

// middle search Input field
const SearchInput = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchUsers, { data }] = useLazyQuery(SEARCH_USERS);

  const hasResults = Boolean(query) && results.length > 0;

  // Search for users
  React.useEffect(() => {
    if (query.trim()) {
      setLoading(true);
      const variables = { query: `%${query}%` };
      searchUsers({ variables });
      if (data) {
        setResults(data.users);
      }
    }
    return;
  }, [query, data, searchUsers]);

  const hideToolTip = () => {
    setQuery('');
  };

  return (
    <React.Fragment>
      <div className='relative z-10'>
        {hasResults && (
          <SearchToolTip results={results} hideToolTip={hideToolTip} />
        )}
        <div className='middle flex items-center'>
          <BsSearch className='text-gray-500 -m-5 z-20' />
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className='p-1 bg-white-100 border border-gray-400 rounded text-center w-64 outline-none'
            type='text'
            placeholder='Search'
          />
          <span className='clear text-gray-500 cursor-pointer'>
            {loading ? (
              <LoadingIcon />
            ) : (
              <RiCloseCircleLine onClick={() => setQuery('')} />
            )}
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

// Navbar Users search tooltip
const SearchToolTip = ({ results, hideToolTip }) => {
  const history = useHistory();
  const toolTipRef = React.useRef();
  useOutsideClick(toolTipRef, hideToolTip);

  return (
    <SearchToolTipStyles ref={toolTipRef}>
      <div
        onClick={hideToolTip}
        className=' tooltip-card bg-white  absolute shadow-lg rounded-md divide-y divide-gray-400'>
        {results.map((result) => (
          <React.Fragment key={result.id}>
            <div
              onClick={() => history.push(`/${result.username}`)}
              className=' card-content flex items-center p-4 cursor-pointer '>
              <img
                style={{ width: 50, height: 50, objectFit: 'cover' }}
                className='w-12 rounded-full'
                src={result.profile_image}
                alt='avatar'
              />
              <div className='ml-2'>
                <h1 className='font-bold text-gray-700'>{result.username}</h1>
                <h1 className='text-gray-500'>{result.name}</h1>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </SearchToolTipStyles>
  );
};

// Profile Picture tooltip component
const ProfileToolTip = ({ toggleProfileToolTip }) => {
  const { signOut } = useContext(AuthContext);
  const { me } = useContext(UserContext);
  const { username } = me;

  const profileTooltipRef = useRef();
  useOutsideClick(profileTooltipRef, toggleProfileToolTip);

  return (
    <ProfileToolTipStyle ref={profileTooltipRef}>
      <div className='card bg-white shadow-lg rounded'>
        <div className='py-4 hover:bg-gray-200 '>
          <Link className='flex items-center px-4 ' to={`/${username}`}>
            <BiUserCircle className='mr-2 text-gray-800' size='1.7rem' />
            <span className='text-gray-700'>Profile</span>
          </Link>
        </div>
        <div className=' py-4 hover:bg-gray-200'>
          <Link className='flex items-center px-4 ' to={`/${username}/saved`}>
            <SaveIcon className='mr-2' size='1.5rem' />
            <span className='text-gray-700'>Saved</span>
          </Link>
        </div>
        <div className=' py-4 hover:bg-gray-200'>
          <Link className='flex items-center px-4 ' to='/accounts/edit'>
            <GearIcon className='mr-2' size='1.5rem' />
            <span className='text-gray-700'>Settings</span>
          </Link>
        </div>
        <hr />
        <button
          onClick={signOut}
          className='hover:bg-gray-200 focus:outline-none flex justify-items-end text-lg text-gray-700 p-4 w-full'>
          Log Out
        </button>
      </div>
    </ProfileToolTipStyle>
  );
};

export default Navbar;

// All Components Styles

// Navbar styles
const Styles = styled.div`
  .clear {
    margin-left: -20px;
  }

  .right > * {
    margin: 10px;
  }

  .user-avatar {
    border: 1px solid #718096;
    padding: 1.3px;
  }

  @media (max-width: 600px) {
    .user-avatar {
      max-width: 44px;
    }
  }
`;

// Search tooltip styles
const SearchToolTipStyles = styled.div`
  position: absolute;
  top: 60px;
  z-index: 1000;
  .tooltip-card {
    width: 20rem;
    left: -55px;
    max-height: 30rem;
    overflow: scroll;
  }
  .card-content:hover {
    background: #fafafa;
  }
`;

// Profile tooltip styles
const ProfileToolTipStyle = styled.div`
  .card {
    position: absolute;
    top: 55px;
    right: 15rem;
    width: 18rem;
    max-width: 20rem;
    z-index: 50;
  }
  @media (max-width: 768px) {
    .card {
      right: 10px;
    }
  }
`;
