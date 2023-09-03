import MoveHistory from "./move-history";

interface MoveProps {
	isCorrect: boolean | null;
	moveHistory: string[];
	isCurrent: boolean;
}

const MoveBlock: React.FC<MoveProps> = ({ isCorrect, moveHistory, isCurrent }) => {
	// const borderColor = isCorrect === null && !isCurrent ? "border-gray-900" : isCurrent ? "border-blue-500" : isCorrect ? "border-green-500" : "border-red-500";

	const getBorderColor = () => {
		if (isCorrect === null) {
			return "border-blue-500";
		} else if (isCorrect === false) {
			return "border-red-500";
		} else if (isCorrect === true) {
			return "border-green-500";
		} else {
			return "border-gray-900";
		}
	};

	return (
		<div className={`block-border font-sans text-xl text-gray-600 w-[7rem] h-24 mx-1 border-4 ${getBorderColor()}`}>
			<div className="move-history tracking-wide text-center">
				<MoveHistory moveHistory={moveHistory} />
			</div>
		</div>
		// move numbers and the move next to it
		// border turns green on success, red on failure
	);
};

export default MoveBlock;
