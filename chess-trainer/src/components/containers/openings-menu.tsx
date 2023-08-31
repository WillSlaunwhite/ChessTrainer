import { List, ListItem, Card } from "@material-tailwind/react";


const OpeningsMenu: React.FC<{ setFen: (fen: string) => void; setIsQuizActive: (isActive: boolean) => void}> = ({setFen, setIsQuizActive}) => {
	const openings = {
		"Italian": "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
		"Guioco": "r1bqk2r/1pp2ppp/p1np1n2/2b1p3/4P3/1BPP1N2/PP3PPP/RNBQ1RK1 b kq - 1 7",
		"Two-Knights": "r1bq1rk1/ppp1bppp/2np1n2/4p3/2B1P3/2PP1N2/PP3PPP/RNBQR1K1 b - - 0 7",
		"Alt-Italian": "r1bqk2r/1pp2ppp/p1np1n2/2b1p3/4P3/1BPP1N2/PP3PPP/RNBQ1RK1 b kq - 1 7",
		"Ruy": "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
		"Scotch": "r1bqkbnr/pppp1ppp/2n5/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4",
		"Sicilian": "rnbqkbnr/pp2pppp/3p4/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 3",
		"French": "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 3",
		"Caro-Kann": "rnbqkbnr/pp2pppp/2p5/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 3"
	}

	const openGame = (name: keyof typeof openings) => {
		setFen(openings[name]);
		setIsQuizActive(true);
	}

	return (
		<div className="menu-container w-full flex items-center justify-center flex-col gap-1 mt-1">
			<h2 className="menu-header">Select an Opening to Practice</h2>
			<Card className="w-10/12">
				<List className="mt-1">
					<ListItem className="ripple-bg-blue-700 ripple" onClick={() => openGame("Italian")}>Italian Game</ListItem>
					<ListItem className="ripple-bg-blue-700 ripple" onClick={() => openGame("Ruy")}>Ruy Lopez</ListItem>
					<ListItem className="ripple-bg-blue-700 ripple" onClick={() => openGame("Scotch")}>Scotch Game</ListItem>
				</List>
			</Card>
			<Card className="w-10/12 bg-black mt-1">
				<List>
					<ListItem className="text-light-400 ripple-bg-blue-700 ripple"onClick={() => openGame("Sicilian")}>Sicilian Defense</ListItem>
					<ListItem className="text-light-400 ripple-bg-blue-700 ripple"onClick={() => openGame("French")}>French Defense</ListItem>
					<ListItem className="text-light-400 ripple-bg-blue-700 ripple"onClick={() => openGame("Caro-Kann")}>Caro-Kann</ListItem>
				</List>
			</Card>
		</div>
	);
}

export default OpeningsMenu;