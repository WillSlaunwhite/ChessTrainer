import { Card, List, ListItem } from "@material-tailwind/react";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useGameState } from "../../contexts/game/game-context";
import { INIT_GAME, MAKE_MOVE_ALT_FORMAT, SET_NEXT_MOVE } from "../../contexts/game/gameActions";
import { convertToFullMoves, determineNextComputerMove } from "../../utility/chessUtils";

const OpeningsMenu: React.FC = () => {
	const [gameState, dispatch] = useGameState();
	const [openings, setOpenings] = useState<OpeningDTO[]>([]);
	const navigate = useNavigate();

	const openGame = async (openingName: string) => {
		const tempGame = new Chess();
		try {
			const response = await fetch(`http://localhost:8085/api/openings/${openingName}/start`)
			const opening: OpeningDTO = await response.json();

			const baseSequence = opening.baseMovesSequence[0].split(/\s+/).map(move => move.replace(/^\d+\./, ''));
			const fens: string[] = []
			const firstMoves: string[] = [];

			const fullMoveSequences = opening.variations.map(variation => {
				if (variation.movesSequence[0]) {
					return baseSequence.concat(variation.movesSequence);
				} else { return baseSequence; }
			});

			await Promise.all(fullMoveSequences.map(async (sequence: string[], i: number) => {
				const fullMoves = convertToFullMoves(sequence);
				const firstComputerMove = await determineNextComputerMove(fullMoves);

				if (firstComputerMove) { firstMoves[i] = firstComputerMove; }

				fullMoves.map(movePair => {
					if (movePair !== "") {
						const moves: string[] = movePair.split(" ");
						moves.map(move => {
							if (move !== "") {
								tempGame.move(move);
							};
						});

					}
				});
				if (!fens.includes(tempGame.fen())) {
					fens.push(tempGame.fen());
				}
				tempGame.reset();
			}));

			dispatch({
				type: INIT_GAME, payload: {
					fen: fens[0],
					moveHistories: fullMoveSequences,
					currentFens: fens,
					initialMoves: firstMoves,
					nextMoves: firstMoves,
				}
			});

			navigate('/game');
		}
		catch (error) {
			console.error('Failed to fetch variations: ', error);
		};
	}


	useEffect(() => {
		fetch('http://localhost:8085/api/openings/')
			.then((res) => res.json())
			.then((openings: OpeningDTO[]) => {
				setOpenings(openings);
			})
			.catch((error) => console.error('Failed to fetch openings: ', error));
	}, []);


	return (
		<div className="menu-container w-full flex items-center justify-center flex-col gap-1 mt-1">
			<h2 className="menu-header">Select an Opening to Practice</h2>
			<Card className="w-5/6">
				<List className="mt-1">
					{openings.map((opening) => (
						<ListItem key={opening.name} className="ripple-bg-blue-700 ripple" onClick={() => openGame(opening.name)}>{opening.name}</ListItem>
					))}
				</List>
			</Card>
		</div>
	);
}

export default OpeningsMenu;