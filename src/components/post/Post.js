import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import UserCard from '../shared/UserCard';
import { MoreIcon } from '../../icons';
import {
  LikeIcon,
  ShareIcon,
  SaveIcon,
  CommentIcon,
  UnlikeIcon,
  RemoveIcon,
} from '../../icons';
import { Link } from 'react-router-dom';
import OptionsDialog from '../shared/OptionsDialog';
import { useSubscription, useMutation } from '@apollo/react-hooks';
import { GET_POST } from '../../graphql/subscription';
import LoadingScreen from '../shared/LoadingScreen';
import { formatDistance, subDays } from 'date-fns';
import { UserContext } from '../../App';
import {
  LIKE_POST,
  UNLIKE_POST,
  SAVED_POST,
  DELETE_SAVED_POST,
  ADD_COMMENT,
} from '../../graphql/mutation';
import formatPostDate, { formatDateToNowShort } from '../../utils/formatDate';

const Post = ({ postId }) => {
  const variables = { postId };
  const { data, loading } = useSubscription(GET_POST, { variables });
  const [showOptionDialog, setDialog] = useState(false);
  const avatarHeight = 45;
  const avatarwidth = 45;

  if (loading) {
    return <LoadingScreen />;
  }
  const {
    location,
    likes,
    id,
    likes_aggregate,
    caption,
    comments,
    media,
    created_at,
    saved_posts,
    user,
  } = data.posts_by_pk;

  const likesCount = likes_aggregate.aggregate.count;
  const likeDescription =
    likes_aggregate.aggregate.count > 1 ? 'likes' : 'like';

  return (
    <Styles>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-2 border border-gray-500'>
        <div className='col-span-7'>
          <img className='post-image' src={media} alt='Post media' />
        </div>
        <div className='col-span-5 post-content'>
          <div className=' hidden md:flex justify-between items-center mb-3'>
            <div className='mt-1'>
              <Link className='flex items-center' to={`/${user.username}`}>
                <img
                  style={{ width: 60, height: 60 }}
                  className='rounded-full mr-2'
                  src={user.profile_image}
                  alt='user'
                />
                <p>{user.username}</p>
              </Link>
              {/* <UserCard
                user={user}
                avatarHeight={avatarHeight}
                avatarWidth={avatarwidth}
              /> */}
            </div>
            <MoreIcon
              onClick={() => setDialog(true)}
              className='cursor-pointer mr-2'
            />
          </div>
          <hr />
          {/* postfeed details */}
          <div className='py-1 px-4'>
            <div className='post-text md:py-5'>
              <Postauthor
                user={user}
                caption={caption}
                created_at={created_at}
              />
              <Postcomments comments={comments} />
            </div>
            <hr />
            <div>
              <hr />
              <div className='grid grid-cols-12 pt-3'>
                <div className='col-span-11'>
                  <div className='flex items-center '>
                    <LikeButton likes={likes} postId={id} authorId={user.id} />
                    <Link to={`/post/${id}`}>
                      <CommentIcon className='mx-2 cursor-pointer' />
                    </Link>
                    <ShareIcon className='mx-2 cursor-pointer' />
                  </div>
                </div>
                <SaveButton postId={postId} savedPost={saved_posts} />
              </div>
              <div className='font-medium text-gray-600 mb-2 pt-3'>
                <span>
                  {likesCount < 1 ? (
                    <small className='text-gray-500'>
                      be the first person to like
                    </small>
                  ) : (
                    `${likesCount} ${likeDescription}`
                  )}
                </span>
              </div>
              <div className='text-gray-500 text-xs mb-4'>
                {formatDateToNowShort(created_at)}
              </div>
              <hr />
              <Comment postId={id} />
            </div>
          </div>
        </div>
      </div>
      {showOptionDialog && <OptionsDialog onClose={() => setDialog(false)} />}
    </Styles>
  );
};

const Postauthor = ({ user, caption, created_at }) => {
  return (
    <React.Fragment>
      <div className='hidden md:block'>
        <div className='grid grid-cols-12 gap-2'>
          <Link className='col-span-2 ' to={`/${user.username}`}>
            <img
              style={{ width: 50, height: 50 }}
              className='rounded-full object-cover'
              src={user.profile_image}
              alt='user'
            />
          </Link>
          <div className=' col-span-10'>
            <div className='mb-2'>
              <span className=' text-lg font-medium mr-1 text-gray-800'>
                {user.username}
              </span>
              <span dangerouslySetInnerHTML={{ __html: caption }} />
            </div>
            <p className='text-gray-600'>{formatDateToNowShort(created_at)}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

// Post comment
const Postcomments = ({ comments }) => {
  comments.map((comment) => {
    return console.log(comment.user.username);
  });
  return (
    <>
      {comments.map((comment) => (
        <div className='hidden md:block py-5' key={comment.id}>
          <div className='grid grid-cols-12 gap-2'>
            <Link className='col-span-2' to={`/${comment.user.username}`}>
              <img
                style={{ width: 50, height: 50 }}
                className='rounded-full object-cover'
                src={comment.user.profile_image}
                alt='user'
              />
            </Link>
            <div className=' col-span-10'>
              <div className=' flex  mb-2'>
                <span className=' text-lg font-medium mr-1 text-gray-800'>
                  {comment.user.username}
                </span>
                <p>{comment.content}</p>
              </div>
              <p className='text-gray-600'>
                {formatDateToNowShort(comment.created_at)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// Like Button
export const LikeButton = ({ likes, postId, authorId }) => {
  const { currentUserId } = useContext(UserContext);
  const isAlreadyLiked = likes.some(({ user_id }) => user_id === currentUserId);
  const [liked, setLiked] = useState(isAlreadyLiked);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const onClick = liked ? handleUnlike : handleLike;
  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);
  const variables = {
    postId,
    userId: currentUserId,
  };

  function handleLike() {
    setLiked(true);
    likePost({ variables });
  }

  function handleUnlike() {
    setLiked(false);
    unlikePost({ variables });
  }

  return <Icon onClick={onClick} className='cursor-pointer' />;
};

// Save button
export const SaveButton = ({ postId, savedPost }) => {
  const { currentUserId } = useContext(UserContext);
  const [savePost] = useMutation(SAVED_POST);
  const [deleteSavedPost] = useMutation(DELETE_SAVED_POST);
  const variables = {
    postId,
    userId: currentUserId,
  };
  const isAlreadySaved = savedPost.some(
    ({ user_id }) => user_id === currentUserId
  );
  const [save, setSave] = useState(isAlreadySaved);
  const Icon = save ? RemoveIcon : SaveIcon;

  const onClick = save ? handleDeleteSave : handleSave;

  function handleSave() {
    setSave(true);
    savePost({ variables });
  }
  function handleDeleteSave() {
    setSave(false);
    deleteSavedPost({ variables });
  }

  return <Icon onClick={onClick} className='cursor-pointer' />;
};

// Comment Input component
const Comment = ({ postId }) => {
  const [content, setContent] = useState('');
  const { currentUserId } = useContext(UserContext);
  const [addComment] = useMutation(ADD_COMMENT);

  const handleAddComment = async () => {
    const variables = {
      content,
      postId,
      userId: currentUserId,
    };
    await addComment({ variables });
  };

  return (
    <div className='hidden md:block'>
      <form className=' flex items-center justify-between bg-white'>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className=' bg-none outline-none p-4'
          type='text'
          placeholder='Add a comment...'
        />
        <button
          onClick={handleAddComment}
          disabled={!content.trim()}
          className={
            !content.trim()
              ? 'col-span-1 text-blue-200 cursor-not-allowed focus:outline-none '
              : 'col-span-1 text-blue-500 focus:outline-none'
          }>
          Post
        </button>
      </form>
    </div>
  );
};

const Styles = styled.div`
  .post-text {
    height: 20rem;
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .post-image {
    width: 100%;
    height: 570px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    .post-text {
      height: 0px;
    }
    .post-image {
      height: auto;
    }
  }
`;

export default Post;
