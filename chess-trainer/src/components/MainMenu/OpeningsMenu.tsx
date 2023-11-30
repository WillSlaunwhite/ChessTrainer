import { Card, List, ListItem, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useGameState } from "../../store/game/contexts/GameContext";
import { fetchOpening, processOpeningData } from "../../services/apiService";
import { INIT_GAME } from "../../store/game/types/actionTypes";

const OpeningsMenu: React.FC = () => {
	const [gameState, dispatch] = useGameState();
	const [openings, setOpenings] = useState<OpeningDTO[]>([]);
	const navigate = useNavigate();

	const openGame = async (openingName: string) => {
		try {
			const opening: OpeningDTO = await fetchOpening(openingName);
			const gameData = await processOpeningData(opening, gameState.lines);
			
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
			
			<Typography variant="h4">Select an Opening to Practice</Typography>
			<Card className="w-5/6 opacity-80 mt-3">
				<List className="w-full p-0">
					{openings.map((opening) => (
						<ListItem key={opening.name} className="ripple-bg-blue-700 ripple text-center p-4" onClick={() => openGame(opening.name)}><Typography variant="h4" className="w-full">{opening.name}</Typography></ListItem>
					))}
				</List>
			</Card>
		</div>
	);
}

export default OpeningsMenu;