import { gql } from 'apollo-boost';

export const CREATE_USER = gql`
  mutation createUser(
    $name: String!
    $username: String!
    $email: String!
    $bio: String!
    $phoneNumber: String!
    $profileImage: String!
    $website: String!
    $userId: String!
  ) {
    insert_users(
      objects: {
        bio: $bio
        email: $email
        name: $name
        phone_number: $phoneNumber
        profile_image: $profileImage
        user_id: $userId
        username: $username
        website: $website
      }
    ) {
      affected_rows
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser(
    $id: uuid!
    $bio: String!
    $email: String!
    $gender: String
    $name: String!
    $phone_number: String!
    $username: String!
    $website: String!
  ) {
    update_users(
      where: { id: { _eq: $id } }
      _set: {
        bio: $bio
        email: $email
        gender: $gender
        name: $name
        phone_number: $phone_number
        username: $username
        website: $website
      }
    ) {
      affected_rows
      returning {
        website
        username
        phone_number
        name
        gender
        email
        bio
      }
    }
  }
`;

export const EDIT_USER_AVATAR = gql`
  mutation editUserAvatar($id: uuid!, $profileImage: String!) {
    update_users(
      where: { id: { _eq: $id } }
      _set: { profile_image: $profileImage }
    ) {
      affected_rows
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost(
    $userId: uuid!
    $media: String!
    $caption: String!
    $location: String
  ) {
    insert_posts(
      objects: {
        caption: $caption
        location: $location
        media: $media
        user_id: $userId
      }
    ) {
      affected_rows
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: uuid!, $userId: uuid!) {
    insert_likes(objects: { post_id: $postId, user_id: $userId }) {
      affected_rows
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation unlikePost($postId: uuid!, $userId: uuid!) {
    delete_likes(
      where: { post_id: { _eq: $postId }, user_id: { _eq: $userId } }
    ) {
      affected_rows
    }
  }
`;

export const SAVED_POST = gql`
  mutation savePost($postId: uuid!, $userId: uuid!) {
    insert_saved_posts(objects: { post_id: $postId, user_id: $userId }) {
      affected_rows
    }
  }
`;

export const DELETE_SAVED_POST = gql`
  mutation deleteSavedPost($postId: uuid!, $userId: uuid!) {
    delete_likes(
      where: { post_id: { _eq: $postId }, user_id: { _eq: $userId } }
    ) {
      affected_rows
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: uuid!, $userId: uuid!, $content: String!) {
    insert_comments(
      objects: { content: $content, user_id: $userId, post_id: $postId }
    ) {
      affected_rows
    }
  }
`;
