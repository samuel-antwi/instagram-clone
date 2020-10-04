import { gql } from 'apollo-boost';

export const GET_USER_EMAIL = gql`
  query getUserEmail($input: String!) {
    users(
      where: {
        _or: [{ username: { _eq: $input } }, { phone_number: { _eq: $input } }]
      }
    ) {
      email
    }
  }
`;

export const GET_EDIT_USERPROFILE = gql`
  query getEditUserProfile($id: uuid!) {
    users_by_pk(id: $id) {
      bio
      email
      name
      phone_number
      profile_image
      username
      website
      id
      gender
    }
  }
`;

export const SEARCH_USERS = gql`
  query searchUsers($query: String) {
    users(
      where: {
        _or: [{ username: { _ilike: $query } }, { name: { _ilike: $query } }]
      }
    ) {
      email
      name
      profile_image
      username
      id
    }
  }
`;

export const GET_ALL_POST = gql`
  query getAllPost {
    posts(order_by: { created_at: desc }) {
      caption
      id
      media
      user {
        username
        profile_image
      }
      location
      comments(order_by: { created_at: desc }) {
        content
        created_at
        user {
          username
        }
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      likes {
        id
        user_id
      }
      saved_posts {
        id
        user_id
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query getUserProfile($username: String!) {
    users(where: { username: { _eq: $username } }) {
      name
      username
      website
      user_id
      id
      profile_image
      followers {
        id
        profile_id
      }
      followers_aggregate {
        aggregate {
          count
        }
      }
      following {
        id
        profile_id
      }
      following_aggregate {
        aggregate {
          count
        }
      }
      saved_post {
        post {
          media
          likes_aggregate {
            aggregate {
              count
            }
          }
          comments_aggregate {
            aggregate {
              count
            }
          }
        }
      }
      posts {
        comments_aggregate {
          aggregate {
            count
          }
        }
        likes_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`;
