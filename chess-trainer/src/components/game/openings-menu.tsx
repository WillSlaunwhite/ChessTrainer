import { List, ListItem, Card } from "@material-tailwind/react";
import { useEffect, useState } from "react";


const OpeningsMenu: React.FC<{ setFen: (fen: string) => void; setIsQuizActive: (isActive: boolean) => void }> = ({ setFen, setIsQuizActive }) => {
	const [openings, setOpenings] = useState<OpeningDTO[]>([]);

	const openGame = (opening: OpeningDTO) => {
		setFen(opening.moveSequence.join(" "));
		setIsQuizActive(true);
	}

	useEffect(() => {
		fetch('/api/openings/')
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