const mainText = "Hello! Your task is to find the best continuation for white after three different black moves in a given position.";
const subtext = "After three correct answers, you can move on to the next move in the opening. Good luck!"

const Rules: React.FC = () => {
	return (
		<div className="text-container mb-4 text-gray-600 brightness-95 w-full flex flex-col">
			<p className="main-text text-sm scale-105 mb-1 text-center w-11/12 mx-auto">{mainText}</p>
			<p className="subtext text-xs scale-110 mx-auto w-11/12 text-center">{subtext}</p>
		</div>
	);
};

export default Rules;
