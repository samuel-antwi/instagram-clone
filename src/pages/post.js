import React from 'react';
import Layout from '../components/shared/Layout';
import Post from '../components/post/Post';
import { useParams } from 'react-router-dom';
import MorePostsFromUser from '../components/post/MorePostsFromUser';

const PostPage = () => {
  const { postId } = useParams();

  return (
    <Layout>
      <div className='mb-10'>
        <Post postId={postId} />
      </div>
      <hr />
      <MorePostsFromUser />
    </Layout>
  );
};

export default PostPage;
