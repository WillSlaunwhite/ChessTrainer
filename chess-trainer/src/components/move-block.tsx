interface MoveProps {
	moveNumber?: number;
	movePiece?: string;
}

const MoveBlock: React.FC<MoveProps> = ({ moveNumber = 3, movePiece = "..." }) => {
	return (
		<div className="block-border w-20 h-20 mx-4 border-2 border-slate-400">
			<p className="text-indigo-400 tracking-widest mx-2">
				{moveNumber}. {movePiece}
			</p>
			<p className="text-indigo-400 tracking-widest mx-2">
				{moveNumber + 1}. {movePiece}
			</p>
			<p className="text-indigo-400 tracking-widest mx-2">
				{moveNumber + 2}. {movePiece}
			</p>
		</div>
		// move numbers and the move next to it
		// border turns green on success, red on failure
	);
};

export default MoveBlock;
