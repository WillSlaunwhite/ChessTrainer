import React from "react";

interface MoveProps {
	move: string;
}

const Move: React.FC<MoveProps> = ({ move }) => {
	return <p>{ move }</p>;
};

export default Move;