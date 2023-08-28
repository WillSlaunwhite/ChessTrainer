import { List, ListItem, Card } from "@material-tailwind/react";


export function OpeningsMenu() {
	return (
		<div className="menu-container w-full flex items-center justify-center flex-col gap-1 mt-1">
			<h2 className="menu-header">Select an Opening to Practice</h2>
			<Card className="w-10/12">
				<List className="mt-1">
					<ListItem className="ripple-bg-blue-700 ripple">Italian</ListItem>
					<ListItem className="opacity-50 cursor-not-allowed">Rui Lopez</ListItem>
					<ListItem className="opacity-50 cursor-not-allowed">Scotch Game</ListItem>
				</List>
			</Card>
			<Card className="w-10/12 bg-black mt-1">
				<List>
					<ListItem className="text-light-400 opacity-50 cursor-not-allowed">Sicilian Defense</ListItem>
					<ListItem className="text-light-400 opacity-50 cursor-not-allowed">French Defense</ListItem>
					<ListItem className="text-light-400 opacity-50 cursor-not-allowed">Caro-Kann</ListItem>
				</List>
			</Card>
		</div>
	);
}
