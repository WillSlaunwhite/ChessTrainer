import { Card, List, ListItem } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useGameState } from "../../store/game/contexts/GameContext";
import { INIT_GAME } from "../../store/game/actions/gameActions";
import { fetchOpening, processOpeningData } from "../../utility/chessUtils";

const OpeningsMenu: React.FC = () => {
	const [_gameState, dispatch] = useGameState();
	const [openings, setOpenings] = useState<OpeningDTO[]>([]);
	const navigate = useNavigate();

	const openGame = async (openingName: string) => {
		try {
			const opening: OpeningDTO = await fetchOpening(openingName);
			const gameData = await processOpeningData(opening);
			console.log("GAME DATA: ", gameData);
			
			dispatch({
				type: INIT_GAME,
				payload: gameData
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