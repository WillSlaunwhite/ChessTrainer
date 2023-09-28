import React from "react";

interface MoveProps {
	move: string;
	isRecent?: boolean;
}

const Move: React.FC<MoveProps> = ({ move, isRecent = false }) => {
	const moveStyle = isRecent ? "text-blue-500 font-bold" : "";
	return <span className={`${moveStyle} px-2 overflow-hidden mx-auto`}>{ move } </span>;
};

export default Move;