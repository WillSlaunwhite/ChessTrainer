import { Typography } from "@material-tailwind/react";
import React from "react";

interface MoveProps {
	move: string;
	isRecent?: boolean;
	isActive: boolean;
}

const Move: React.FC<MoveProps> = ({ move, isRecent = false, isActive }) => {
	const recentStyle = isRecent ? "text-blue-500 font-bold" : "";
	const activeStyle = !isActive ? "text-gray-400 font-thin" : "";
	return <Typography variant="lead" color="black" className={`${recentStyle} ${activeStyle} text-lg w-11/12 mx-auto text-center`}>{move}</Typography>;
};

export default Move;