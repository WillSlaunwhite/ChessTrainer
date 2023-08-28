interface MoveProps {
	moveNumber?: number;
	movePiece?: string;
}

const MoveBlock: React.FC<MoveProps> = ({ moveNumber = 3, movePiece = "..." }) => {
	return (
		<div className="block-border font-sans text-xl text-gray-600 w-[7rem] h-24 mx-1 border-2 border-green-900">
			<p className="tracking-widest mx-2 ml-4">
				{moveNumber}. {movePiece}
			</p>
			<p className="tracking-widest mx-2 ml-4">
				{moveNumber + 1}. {movePiece}
			</p>
			<p className="tracking-widest mx-2 ml-4">
				{moveNumber + 2}. {movePiece}
			</p>
		</div>
		// move numbers and the move next to it
		// border turns green on success, red on failure
	);
};

export default MoveBlock;
