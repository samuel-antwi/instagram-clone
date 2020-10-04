import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Dialog, Zoom } from '@material-ui/core';

const OptionsDialog = ({ onClose }) => {
  return (
    <Styles>
      <Dialog open onClose={onClose} TransitionComponent={Zoom}>
        <div className='card w-64'>
          <div className='p-3'>
            <Link className='text-red-600 font-medium' to='/'>
              Report
            </Link>
          </div>
          <hr />
          <div className='p-3'>
            <Link className='text-red-600 font-medium' to='/'>
              Unfollow
            </Link>
          </div>
          <hr />
          <div className='p-3'>
            <Link to='/'>Go to post</Link>
          </div>
          <hr />
          <div className='p-3'>
            <Link to='/'>Share</Link>
          </div>
          <hr />
          <div className='p-3'>
            <Link to='/'>Copy Link</Link>
          </div>
          <hr />
          <div className='p-3'>
            <Link to='/'>Embed</Link>
          </div>
          <hr />
          <div onClick={onClose} className='p-3'>
            <Link to='/'>Cancel</Link>
          </div>
        </div>
      </Dialog>
    </Styles>
  );
};

export default OptionsDialog;

const Styles = styled.div``;
