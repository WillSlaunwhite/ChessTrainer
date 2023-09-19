import { List, ListItem, Card } from "@material-tailwind/react";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";


const OpeningsMenu: React.FC<{ setFen: (fen: string) => void; setIsQuizActive: (isActive: boolean) => void }> = ({ setFen, setIsQuizActive }) => {
	const [openings, setOpenings] = useState<OpeningDTO[]>([]);

	const openGame = (opening: OpeningDTO) => {
		const tempGame = new Chess();

		const components = opening.moveSequence[0].split(/\s+/);

		const moves = components.map(move => move.replace(/^\d+\./, ''));
		console.log(`Parsed Moves: ${moves.join(",")}`);
		console.log(`Moves after splitting and filtering: ${moves.join(",")}`);

		console.log(`MOVE SEQUENCE ${components}`);
		console.log(`MOVES ${moves}`);

		for (let move of moves) {
			const result = tempGame.move(move);

			// If the move is invalid, log it for troubleshooting
			if (!result) {
				console.error(`Failed to apply move: ${move}`);
			}
		}
		

		// moves.forEach(move => tempGame.move(move));
		const resultingFen = tempGame.fen()
		// opening.moveSequence[0].split(" ").filter(move => !move.match(/^\d+\./)).forEach(move => tempGame.move(move))
		console.log(`opening: ${opening.name} \njoined sequence: ${opening.moveSequence.join(" ")}`)
		setFen(resultingFen);
		console.log("TEMP FEN ", resultingFen);
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