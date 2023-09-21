import { List, ListItem, Card } from "@material-tailwind/react";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { useHistory } from "../../contexts/history-context";
import { ChessInstance } from "chess.js";


const OpeningsMenu: React.FC<{ setFen: (fen: string) => void; setIsQuizActive: (isActive: boolean) => void }> = ({ setFen, setIsQuizActive }) => {
	const { moveHistories, setMoveHistories } = useHistory();
	const [openings, setOpenings] = useState<OpeningDTO[]>([]);

	const executeMovesOnGame = (game: ChessInstance, moves: string[]): void => {
		for (let move of moves) {
			const result = game.move(move);

			// If the move is invalid, log it for troubleshooting
			if (!result) {
				console.error(`Failed to apply move: ${move}`);
			}
		}

		setMoveHistories(prevHistories => {
			const newHistories = [...prevHistories];
			newHistories[0] = [...newHistories[0], ...moves];
			console.log("IN MOVE HISTORIES: ", newHistories);
			return newHistories;
		});

		console.log("IN MOVE HISTORIES 2: ", moveHistories);
	}

	const openGame = (opening: OpeningDTO) => {
		const tempGame = new Chess();

		const components = opening.moveSequence[0].split(/\s+/);
		const moves = components.map(move => move.replace(/^\d+\./, ''));
		console.log(`MOVE COMPONENTS ${components}`);
		console.log(`MOVES ${moves}`);

		executeMovesOnGame(tempGame, moves);

		const resultingFen = tempGame.fen()
		setFen(resultingFen);

		console.log("IN OPEN GAME: ", moveHistories);

		setIsQuizActive(true);
	}

	useEffect(() => {
		fetch('http://localhost:8085/api/openings/')
			.then((res) => res.json())
			.then((data) => setOpenings(data))
			.catch((error) => console.error('Failed to fetch openings: ', error))
	}, []);

	return (
		<div className="menu-container w-full flex items-center justify-center flex-col gap-1 mt-1">
			<h2 className="menu-header">Select an Opening to Practice</h2>
			<Card className="w-10/12">
				<List className="mt-1">
					{openings.map((opening) => (
						<ListItem key={opening.name} className="ripple-bg-blue-700 ripple" onClick={() => openGame(opening)}>{opening.name}</ListItem>
					))}

				</List>
			</Card>
		</div>
	);
}

export default OpeningsMenu;