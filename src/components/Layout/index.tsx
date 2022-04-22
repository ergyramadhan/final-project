import React from 'react';
import Navbar from '../Navbar';

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <div>
      <Navbar />

      {children}
    </div>
  )
}

export default Layout;