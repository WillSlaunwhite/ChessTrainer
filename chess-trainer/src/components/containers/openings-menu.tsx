import { List, ListItem, Card } from "@material-tailwind/react";

export function OpeningsMenu() {
	return (
		<div className="menu-container w-screen flex items-center justify-center flex-col gap-4">
      <h2 className="menu-header">Select an Opening to Practice</h2>
			<Card className="w-10/12">
				<List>
					<ListItem>Italian</ListItem>
					<ListItem>Rui Lopez</ListItem>
					<ListItem>Scotch Game</ListItem>
				</List>
			</Card>
			<Card className="w-10/12 bg-black ">
				<List>
					<ListItem className="text-light-400">Sicilian Defense</ListItem>
					<ListItem className="text-light-400">French Defense</ListItem>
					<ListItem className="text-light-400">Caro-Kann</ListItem>
				</List>
			</Card>
		</div>
	);
}
