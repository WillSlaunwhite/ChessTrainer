import { Typography } from "@material-tailwind/react";

const mainText = "Follow the opening and its variations as quickly and accurately as possible.";
const subtext = "After three answers, you can move on to the next move in the opening. Good luck!"

const Rules: React.FC = () => {
	return (
		<div className="text-container flex flex-col mb-4 mx-auto py-1">
			<Typography variant="lead" color="blue" className="text-xl w-11/12 leading-snug mx-auto text-center pb-2">{mainText}</Typography>
			<Typography variant="paragraph" className="text-lg w-11/12 mx-auto text-center">{subtext}</Typography>
		</div>
	);
};

export default Rules;
