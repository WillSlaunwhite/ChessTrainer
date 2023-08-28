import React from "react";

const Header: React.FC = () => {
	return (
		<header className="text-gray-600 font-sans text-center flex flex-col justify-between  w-screen subpixel-antialiased my-1">
			<h1 className="text-[2.15rem] my-0 py-0 h-10 flex justify-center items-center screen tracking-tight ">Welcome to Chess Trainer</h1>
			<h3 className="text-2xl w-full mx-auto h-6 flex items-center justify-center">A modern chess openings tutor.</h3>
		</header>
	);
};

export default Header;
