import React, { useState, useMemo, useContext } from 'react';
import { Dialog } from '@material-ui/core';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { BsChevronLeft } from 'react-icons/bs';
import { UserContext } from '../../App';
import { useHistory } from 'react-router-dom';
import { MdPinDrop } from 'react-icons/md';
import serialize from '../../utils/serialisedToHtml';
import handleImageUpload from '../../utils/handleImageUpload';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_POST } from '../../graphql/mutation';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];
const AddPostDialog = ({ handleCloseAddPostDialog, media }) => {
  const { me, currentUserId } = useContext(UserContext);
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(initialValue);
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const [createPost] = useMutation(CREATE_POST);

  // A function to handle creating new post
  const handleSharePost = async () => {
    setIsSubmitting(true);
    const url = await handleImageUpload(media);
    const variables = {
      userId: currentUserId,
      location,
      caption: serialize({ children: value }),
      media: url,
    };
    createPost({ variables });
    setIsSubmitting(false);
    window.location.reload();
  };

  return (
    <Dialog fullScreen open onClose={handleCloseAddPostDialog}>
      <hr />
      <div className='flex justify-between items-center p-4'>
        <button
          onClick={handleCloseAddPostDialog}
          className='focus:outline-none'>
          <BsChevronLeft size='1.5rem' />
        </button>
        <h1 className='text-lg font-medium'>New Post</h1>
        <button
          onClick={handleSharePost}
          disabled={isSubmitting}
          className={`${
            !isSubmitting && 'text-blue-600'
          } font-semibold text-lg ${
            isSubmitting && 'cursor-default text-blue-300'
          }`}>
          Share
        </button>
      </div>
      <hr />
      <div className='flex justify-between items-center p-4 bg-white'>
        <div className=''>
          <img
            className='rounded-full mb-2'
            style={{ width: 60, height: 60 }}
            src={me.profile_image}
            alt='user avatar'
          />
          <Slate
            className='inline'
            editor={editor}
            value={value}
            onChange={(newValue) => setValue(newValue)}>
            <Editable className='flex-1' placeholder='Write your caption...' />
          </Slate>
        </div>
        {media && (
          <img
            className='rounded'
            style={{ width: 100 }}
            src={URL.createObjectURL(media)}
            alt='MEDIA'
          />
        )}
      </div>
      <hr />
      <div className='flex items-center p-4'>
        <MdPinDrop className='text-gray-700 mr-4' size='2rem' />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder='Add Location...'
          className='flex w-64 text focus:outline-none'
          type='text'
        />
      </div>
      <hr />
    </Dialog>
  );
};

export default AddPostDialog;
