import { Card, List, ListItem } from "@material-tailwind/react";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { useGameState } from "../../contexts/game/game-context";
import { INIT_GAME } from "../../contexts/game/gameActions";
import { ChessInstance } from "chess.js";
import { useNavigate } from "react-router";


const OpeningsMenu: React.FC = () => {
	const [gameState, dispatch] = useGameState();
	const [openings, setOpenings] = useState<OpeningDTO[]>([]);
	const moveHistories = gameState.moveHistories;
	const navigate = useNavigate();

	const executeMovesOnGame = (game: ChessInstance, moves: string[]): void => {
		for (let move of moves) {
			const result = game.move(move);
			// If the move is invalid, log it for troubleshooting
			if (!result) {
				console.error(`Failed to apply move: ${move}`);
			}
		}

		const newHistories = [...moveHistories];
		newHistories[gameState.] = [...newHistories[0], ...moves];
		// setGameState(prevState => ({ ...prevState, moveHistories: newHistories}))
	}

	const openGame = (opening: OpeningDTO) => {
		const tempGame = new Chess();

		const components = opening.moveSequence[0].split(/\s+/);
		const moves = components.map(move => move.replace(/^\d+\./, ''));
		console.log(`MOVE COMPONENTS ${components}`);
		console.log(`MOVES ${moves}`);

		executeMovesOnGame(tempGame, moves);

		console.log("FEN: ", tempGame.fen());
		
		dispatch({ type: INIT_GAME, payload:{ fen: tempGame.fen(), moveSequence: moves}});
		
		navigate('/game');
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