import { v4 as uuid } from 'uuid';

export const defaultUser = {
  isStar: true,
  id: uuid(),
  username: 'i_am_samuelantwi',
  name: 'Samuel Antwi',
  profile_image:
    'https://scontent-lht6-1.cdninstagram.com/v/t51.2885-19/s320x320/35289006_189807175023620_1385861160439382016_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com&_nc_ohc=i6KlgxnIjQAAX9eNQ9A&oh=c9646eabaa8b713f527a6e28915fa323&oe=5F88B4FA',
};

export function getDefaultUser() {
  return {
    isStar: true,
    id: uuid(),
    name: 'Samuel Antwi',
    username: 'i_am_samuelantwi',
    profile_image:
      'https://scontent-lht6-1.cdninstagram.com/v/t51.2885-19/s320x320/35289006_189807175023620_1385861160439382016_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com&_nc_ohc=i6KlgxnIjQAAX9eNQ9A&oh=c9646eabaa8b713f527a6e28915fa323&oe=5F88B4FA',
  };
}

export const defaultPost = {
  id: uuid(),
  likes: 10,
  caption: `<span class="">I am currently learning React JS and I can't wait to start building  some amazing application with it. React is on fire!! 🔥🔥🔥</span>`,
  user: defaultUser,
  media:
    'https://images.unsplash.com/photo-1600361675085-7ad23d454309?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=80',
  comments: [
    `<span class="">Hey, Samuel, good job keep it up!</span>`,
    `<span class="">Let me know if you need any help!</span>`,
  ],
  created_at: '2020-02-28T03:08:14.522421+00:00',
};

export function getDefaultPost() {
  return {
    id: uuid(),
    likes: 6,
    caption: `<span class="">I am currently learning React JS and I can't wait to start building  some amazing application with it. React is on fire!! 🔥🔥🔥</span>`,
    user: defaultUser,
    media:
      'https://images.unsplash.com/photo-1600361675085-7ad23d454309?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=80',
    comments: ['hello', 90],
    created_at: '2020-02-28T03:08:14.522421+00:00',
  };
}

export const defaultNotifications = [
  {
    id: uuid(),
    type: 'follow',
    user: defaultUser,
    created_at: '2020-02-29T03:08:14.522421+00:00',
  },
  {
    id: uuid(),
    type: 'like',
    user: defaultUser,
    post: defaultPost,
    created_at: '2020-02-29T03:08:14.522421+00:00',
  },
];

export const defaultCurrentUser = {
  id: uuid(),
  username: 'i_am_sabutofons',
  name: 'Samuel Antwi',
  profile_image:
    'https://scontent-lht6-1.cdninstagram.com/v/t51.2885-19/s320x320/35289006_189807175023620_1385861160439382016_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com&_nc_ohc=i6KlgxnIjQAAX9eNQ9A&oh=c9646eabaa8b713f527a6e28915fa323&oe=5F88B4FA',
  website: 'https://samuelantwi.com',
  email: 'antwisam80@gmail.com',
  bio: 'This is my bio',
  phone_number: '555-555-5555',
  posts: Array.from({ length: 10 }, () => getDefaultPost()),
  followers: [defaultUser],
  following: [defaultUser],
  gender: '',
};
