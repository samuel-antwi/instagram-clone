import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import Post from './Post';
import { GrClose } from 'react-icons/gr';

const PostModal = () => {
  const history = useHistory();
  const { postId } = useParams();
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <Styles>
      <Modal
        style={{
          content: {
            maxWidth: 966,
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
        ariaHideApp={false}
        isOpen
        onRequestClose={() => history.goBack()}>
        <Post id={postId} />
      </Modal>
      <div className='modal-close' onClick={() => history.goBack()}>
        <GrClose size='1.8rem' />
      </div>
    </Styles>
  );
};

export default PostModal;

const Styles = styled.div`
  width: 960px;

  .modal-close {
    position: fixed;
    right: 30px;
    top: 20px;
    cursor: pointer;
    color: #fff;
    z-index: 10;
  }
`;
