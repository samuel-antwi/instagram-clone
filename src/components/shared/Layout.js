import React from 'react';
import SEO from './Seo';
import Navbar from './Navbar';
import styled from 'styled-components';

function Layout({ children, title, minimalNavbar = false }) {
  return (
    <React.Fragment>
      <SEO title={title} />
      <Navbar minimalNavbar={minimalNavbar} />
      <Styles className='pt-20 container mx-auto'>
        <div>{children}</div>
      </Styles>
    </React.Fragment>
  );
}

export default Layout;

const Styles = styled.div`
  max-width: 1100px;
`;
