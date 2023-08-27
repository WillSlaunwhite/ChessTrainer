const mainText = "Hello! Your task is to find the best continuation for white after three different black moves in a given position.";
const subtext = "After three correct answers, you can move on to the next move in the opening. Good luck!"

const Rules: React.FC = () => {
	return (
		<div className="text-container mb-4 text-gray-200 brightness-95">
			<p className="main-text text-sm scale-105 mb-1 text-center">{mainText}</p>
			<p className="subtext text-xs scale-110 w-10/12 mx-auto text-center">{subtext}</p>
		</div>
	);
};

export default Rules;
