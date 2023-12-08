import { Typography } from "@material-tailwind/react";
import React from "react";

interface MoveProps {
	move: string;
	isRecent?: boolean;
}

const Move: React.FC<MoveProps> = ({ move, isRecent = false }) => {
	const moveStyle = isRecent ? "text-blue-500 font-bold" : "";
	return <Typography variant="lead" color="black" className={`${moveStyle} text-lg w-11/12 mx-auto text-center`}>{move}</Typography>;
};

export default Move;