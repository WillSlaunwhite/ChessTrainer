import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="text-gray-500 font-monospace text-center flex flex-col justify-between h-28 mb-48 subpixel-antialiased">
      <h1 className="text-5xl mb-8">Welcome to Chess Trainer</h1>
      <h3 className="text-2xl">A modern chess openings tutor.</h3>
    </header>
  );
}

export default Header 