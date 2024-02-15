import React from 'react';

function Header({ title }) {
  return (
    <div style={{ backgroundColor: 'grey', color: 'white', padding: '20px', textAlign: 'center' }}>
      {title}
    </div>
  );
}

export default Header;