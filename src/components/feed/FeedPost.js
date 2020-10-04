import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import UserCard from '../shared/UserCard';
import { MoreIcon, UnlikeIcon, LikeIcon } from '../../icons';
import { ShareIcon, SaveIcon, CommentIcon, RemoveIcon } from '../../icons';
import { Link } from 'react-router-dom';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import FollowSuggestions from '../shared/FollowSuggestions';
import OptionsDialog from '../shared/OptionsDialog';
import { LikeButton } from '../post/Post';
import formatPostDate from '../../utils/formatDate';
// import { useSubscription, useMutation } from '@apollo/react-hooks';
// import { LIKE_POST, UNLIKE_POST } from '../../graphql/mutation';
// import { UserContext } from '../../App';

const FeedPost = ({ post, index }) => {
  const [showOptionDialog, setDialog] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const {
    media,
    id,
    likes,
    user,
    caption,
    comments,
    likes_aggregate,
    saved_posts,
    created_at,
  } = post;

  console.log(user);

  const showFollowSuggestion = index === 1;
  const avatarWidth = 45;
  const avatarHeight = 45;

  const likesCount = likes_aggregate.aggregate.count;
  const likeDescription =
    likes_aggregate.aggregate.count > 1 ? 'likes' : 'like';

  return (
    <Styles>
      <div className='border rounded mb-10'>
        <div className='flex justify-between p-4 items-center'>
          <Link className='flex items-center' to={`/${user.username}`}>
            <img
              style={{ width: 60, height: 60 }}
              className='rounded-full mr-2'
              src={user.profile_image}
              alt='user'
            />
            <p>{user.username}</p>
          </Link>
          <MoreIcon
            onClick={() => setDialog(true)}
            className='cursor-pointer'
          />
        </div>
        <Link to={`/post/${post.id}`}>
          <img className='feed-image' src={media} alt='Post media' />
        </Link>
        <div className='flex justify-between p-3'>
          {/* Post feed icons */}
          <div className='flex'>
            <LikeButton likes={likes} postId={id} />
            <Link to={`/post/${id}`}>
              <CommentIcon className='mx-2 cursor-pointer' />
            </Link>
            <Link to={`/direct/inbox`}>
              <ShareIcon className='mx-2 cursor-pointer' />
            </Link>
          </div>
          <SaveButton />
        </div>
        {/* postfeed details */}
        <div className='py-1 px-4'>
          <span>
            {likesCount < 1 ? (
              <small className='text-gray-500'>
                be the first person to like
              </small>
            ) : (
              `${likesCount} ${likeDescription}`
            )}
          </span>
          <div className=' text-gray-700'>
            <Link className='mr-1 font-medium' to={`/${user.username}`}>
              i_am_samuel_antwi
            </Link>
            <div>
              {showCaption ? (
                <div dangerouslySetInnerHTML={{ __html: caption }}></div>
              ) : (
                <div className='flex'>
                  <HTMLEllipsis
                    maxLine='0'
                    ellipses='...'
                    unsafeHTML={caption}
                    basedOn='letters'
                  />
                  <button
                    className='text-gray-500 ml-1 focus:outline-none'
                    onClick={() => setShowCaption(true)}>
                    More
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            {comments.length > 0 && (
              <Link className='text-gray-500' to={`/post/${id}`}>
                {comments.length === 1
                  ? 'View comment'
                  : `View all ${comments.length} comments`}
              </Link>
            )}
          </div>
          <span className='text-gray-500 text-xs'>{created_at}</span>
        </div>
        <hr />
        <Comment />
      </div>
      {showFollowSuggestion && <FollowSuggestions />}
      {showOptionDialog && <OptionsDialog onClose={() => setDialog(false)} />}
    </Styles>
  );
};

// Like Icon
// export const LikeButton = ({ likes, postId, authorId }) => {
//   const { currentUserId } = useContext(UserContext);
//   const isAlreadyLiked = likes.some(({ user_id }) => user_id === currentUserId);
//   const [liked, setLiked] = useState(isAlreadyLiked);
//   const Icon = liked ? UnlikeIcon : LikeIcon;
//   const onClick = liked ? handleUnlike : handleLike;
//   const [likePost] = useMutation(LIKE_POST);
//   const [unlikePost] = useMutation(UNLIKE_POST);
//   const variables = {
//     postId,
//     userId: currentUserId,
//   };

//   function handleLike() {
//     setLiked(true);
//     likePost({ variables });
//   }

//   function handleUnlike() {
//     setLiked(false);
//     unlikePost({ variables });
//   }

//   return <Icon onClick={onClick} className='cursor-pointer' />;
// };

// const LikeButton = () => {
//   const [liked, setLiked] = useState(false);
//   return (
//     <div
//       onClick={() => setLiked((prevLike) => !prevLike)}
//       className='cursor-pointer'>
//       {liked ? <UnlikeIcon /> : <LikeIcon />}
//     </div>
//   );
// };

const SaveButton = () => {
  const [save, setSave] = useState(false);
  return (
    <div
      onClick={() => setSave((prevSave) => !prevSave)}
      className='cursor-pointer'>
      {save ? <RemoveIcon /> : <SaveIcon />}
    </div>
  );
};

// Comment component
const Comment = () => {
  const [content, setContent] = useState('');
  return (
    <div className='hidden md:block'>
      <form className='grid grid-cols-12 bg-white'>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='col-span-11 bg-none outline-none p-4'
          type='text'
          placeholder='Add a comment...'
        />
        <button
          disabled={!content.trim()}
          className={
            !content.trim()
              ? 'col-span-1 text-blue-200 cursor-not-allowed focus:outline-none'
              : 'col-span-1 text-blue-500 focus:outline-none'
          }>
          Post
        </button>
      </form>
    </div>
  );
};

const Styles = styled.div`
  .feed-image {
    width: 100%;
  }
`;

export default FeedPost;
